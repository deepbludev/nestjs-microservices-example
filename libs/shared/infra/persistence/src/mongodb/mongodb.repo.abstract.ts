/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEventBus, IEventPublisherRepo } from '@deepblu/ddd'
import { Injectable } from '@nestjs/common'
import { AggregateRoot, Nullable } from '@obeya/shared/domain'
import { Binary, Collection, Document } from 'mongodb'

import { MongoDbService, MongoDoc } from './mongodb.service'

export type MongoDTO = { id: string } & Document
export type Filter<DTO extends MongoDTO> = Partial<DTO>

@Injectable()
export abstract class MongoDbRepo<
  A extends AggregateRoot,
  DTO extends MongoDTO
> extends IEventPublisherRepo<A> {
  abstract readonly aggregate: string
  abstract readonly mapper: (dto: DTO) => A

  constructor(
    protected readonly client: MongoDbService,
    readonly eventbus: IEventBus
  ) {
    super(eventbus)
  }

  get collection(): Collection<MongoDoc<DTO>> {
    return this.client.db().collection(this.aggregate)
  }

  async get(id: A['id']): Promise<Nullable<A>> {
    const doc: MongoDoc<DTO> = await this.collection.findOne<MongoDoc<DTO>>({
      _id: new Binary(id.value),
    })
    return doc ? this.mapper(doc) : null
  }

  async persist(aggregate: A): Promise<void> {
    const dto: DTO = aggregate.dto as DTO
    await this.collection.updateOne(
      { _id: new Binary(dto.id) },
      { $set: dto },
      { upsert: true }
    )
  }

  async findBy(filter: Filter<DTO>): Promise<Nullable<A>> {
    const doc = await this.collection.findOne<MongoDoc<DTO>>(filter)
    return doc ? this.mapper(doc) : null
  }

  async clear(): Promise<void> {
    await this.collection.deleteMany({})
  }
}
