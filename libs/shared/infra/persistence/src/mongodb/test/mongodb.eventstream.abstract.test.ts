import { Injectable } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { DomainEvent, IDomainEvent } from '@obeya/shared/core'
import { Context } from '@obeya/shared/domain'

import { AggregateStub, AggregateStubDTO } from '../../__mocks__'
import { mongodbConfig } from '../mongodb.config'
import { MongoDbEventStream } from '../mongodb.eventstream.abstract'
import { MongoDbModule } from '../mongodb.module'
import { MongoDbService } from '../mongodb.service'

@Injectable()
export class MongoDbAggregateStubEventStream extends MongoDbEventStream<
  AggregateStub,
  AggregateStubDTO
> {
  aggregate = AggregateStub.name
  mapper = AggregateStub.from

  constructor(protected readonly client: MongoDbService) {
    super(client)
  }
}

describe(MongoDbEventStream, () => {
  let service: MongoDbService
  let stream: MongoDbAggregateStubEventStream
  let aggregate: AggregateStub
  let events: IDomainEvent[]
  let aggId: AggregateStub['id']
  let otherAggregate: AggregateStub
  let otherAggId: AggregateStub['id']
  let otherEvents: IDomainEvent[]

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [mongodbConfig] }),
        MongoDbModule.forRoot({ microservice: Context.TEST }),
      ],
    }).compile()

    service = module.get(MongoDbService)
    stream = new MongoDbAggregateStubEventStream(service)

    await stream.events.deleteMany({})
    await stream.snapshots.deleteMany({})

    aggregate = AggregateStub.create({ foo: 'bar', is: true }).data
    aggregate.toggle()
    aggregate.updateProps({ foo: 'baz' })

    aggId = aggregate.id

    otherAggregate = AggregateStub.create({ foo: 'bar', is: true }).data
    otherAggregate.toggle()
    otherAggregate.toggle()

    otherAggId = otherAggregate.id

    events = aggregate.commit()
    await stream.store(aggregate, events)

    otherEvents = otherAggregate.commit()
    await stream.store(otherAggregate, otherEvents)
  })

  afterAll(async () => {
    await Promise.all([
      stream.events.deleteMany({}),
      stream.snapshots.deleteMany({}),
    ])
    await service.client.close()
  })

  it('is defined', () => {
    expect(MongoDbEventStream).toBeDefined()
  })

  it('stores snapshots', async () => {
    const stored = await stream.getSnapshot(aggId)
    const otherStored = await stream.getSnapshot(otherAggId)

    expect(stored).toEqual(aggregate.dto)
    expect(otherStored).toEqual(otherAggregate.dto)
    expect(await stream.snapshots.countDocuments()).toBe(2)
  })

  it('store events', async () => {
    const fetchedEvents = await stream.getEvents(aggId)
    const otherFetchedEvents = await stream.getEvents(otherAggId)

    // expect(await stream.events.countDocuments()).toBe(6)
    expect(fetchedEvents).toEqual(events.map(e => DomainEvent.dto(e)))
    expect(otherFetchedEvents).toEqual(otherEvents.map(e => DomainEvent.dto(e)))
  })

  it("keeps track of the aggregate's current version", async () => {
    const fetchedVersion = await stream.version(aggId)
    const otherFetchedVersion = await stream.version(otherAggId)

    expect(fetchedVersion).toEqual(aggregate.version)
    expect(otherFetchedVersion).toEqual(otherAggregate.version)
    expect(fetchedVersion).toEqual(2)
    expect(otherFetchedVersion).toEqual(2)
  })

  it('finds aggregates by field', async () => {
    const found = await stream.findBy({ foo: 'baz' })
    expect(found.length).toEqual(1)
    expect(found[0].equals(aggregate)).toBe(true)

    const otherFound = await stream.findBy({ is: true })
    expect(otherFound.length).toEqual(1)
    expect(otherFound[0].equals(otherAggregate)).toBe(true)
  })
})
