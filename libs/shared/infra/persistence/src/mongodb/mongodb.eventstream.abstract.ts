/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { MongoDTO } from './mongodb.types'

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

  async append(aggregateId: A['id'], events: E[]): Promise<void> {
    const docs = events.map(event => ({
      ...DomainEvent.dto<E>(event),
      _id: new Binary(event.id),
      _aggregateId: new Binary(aggregateId.value),
    }))

    await this.events.insertMany(docs)
  }

  async store(aggregate: A, changes: E[]): Promise<void> {
    const { dto } = aggregate
    await this.snapshots.updateOne(
      { _id: new Binary(dto.id) },
      { $set: dto },
      { upsert: true }
    )
    await this.append(aggregate.id, changes)
  }

  async get(aggregateId: A['id']): Promise<E[]> {
    const docs = await this.events
      .find({ _aggregateId: new Binary(aggregateId.value) })
      .project<E>({ _id: 0, _aggregateId: 0 })
      .toArray()

    return docs
  }

  async getSnapshot(aggregateId: A['id']): Promise<DTO> {
    const dto = await this.snapshots.findOne<MongoDoc<DTO>>({
      _id: new Binary(aggregateId.value),
    })

    if (!dto) return null

    Reflect.deleteProperty(dto, '_id')
    return dto
  }

  async version(aggregateId: A['id']): Promise<number> {
    const snapshot = await this.getSnapshot(aggregateId)
    return snapshot ? snapshot.version : -1
  }
}
