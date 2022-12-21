import { Injectable } from '@nestjs/common'
import {
  DomainEvent,
  IDomainEvent,
  IEventStream,
  Payload,
} from '@obeya/shared/core'
import { AggregateRoot } from '@obeya/shared/domain'
import { Binary, Collection } from 'mongodb'

import { MongoDbService, MongoDoc } from './mongodb.service'
import { Filter, MongoDTO } from './mongodb.types'

@Injectable()
export abstract class MongoDbEventStream<
  A extends AggregateRoot<DTO>,
  DTO extends MongoDTO,
  E extends IDomainEvent = IDomainEvent
> extends IEventStream<A, E> {
  abstract readonly aggregate: string
  abstract mapper(dto: DTO): A

  constructor(protected readonly client: MongoDbService) {
    super()
  }

  get snapshots(): Collection<MongoDoc<DTO>> {
    return this.client.db().collection(`${this.aggregate}.snapshots`)
  }

  get events(): Collection<MongoDoc<IDomainEvent<Payload<E>>>> {
    return this.client.db().collection(`${this.aggregate}.events`)
  }

  async append(events: E[]): Promise<void> {
    const docs = events.map(event => ({
      ...DomainEvent.dto<E>(event),
      _id: new Binary(event.id),
      _aggregateId: new Binary(event.aggregateId),
    }))

    await this.events.insertMany(docs)
  }

  async store(aggregate: A, events: E[]): Promise<void> {
    const { dto } = aggregate
    await Promise.all([
      this.append(events),
      this.snapshots.updateOne(
        { _id: new Binary(dto.id) },
        { $set: dto },
        { upsert: true }
      ),
    ])
  }

  async getEvents(aggregateId: A['id']): Promise<E[]> {
    return await this.events
      .find({ _aggregateId: new Binary(aggregateId.value) })
      .project<E>({ _id: 0, _aggregateId: 0 })
      .toArray()
  }

  async getSnapshot(aggregateId: A['id']): Promise<DTO> {
    const [snapshot] = await this.snapshots
      .find({ _id: new Binary(aggregateId.value) })
      .project<DTO>({ _id: 0 })
      .toArray()
    return snapshot
  }

  async version(aggregateId: A['id']): Promise<number> {
    const snapshot = await this.getSnapshot(aggregateId)
    return snapshot ? snapshot.version : -1
  }

  async findBy(filter: Filter<DTO>): Promise<A[]> {
    const docs = await this.snapshots.find<MongoDoc<DTO>>(filter).toArray()
    return docs.map(doc => this.mapper(doc))
  }
}
