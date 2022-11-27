/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common'
import { IEventBus, IEventPublisherRepo } from '@obeya/shared/core'
import { AggregateDTO, AggregateRoot, Nullable } from '@obeya/shared/domain'
import { Binary, Collection, Document } from 'mongodb'

import { MongoDbService, MongoDoc } from './mongodb.service'

export type MongoDTO = AggregateDTO & Document
export type Filter<DTO extends MongoDTO> = Partial<DTO>

@Injectable()
export abstract class MongoDbRepo<
  A extends AggregateRoot<DTO>,
  DTO extends MongoDTO
> extends IEventPublisherRepo<A> {
  abstract readonly aggregate: string
  abstract mapper(dto: DTO): A

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
    const dto = await this.getDTO(id)
    return dto ? this.mapper(dto) : null
  }

  async getDTO(id: A['id']): Promise<Nullable<DTO>> {
    const dto = await this.collection.findOne<MongoDoc<DTO>>({
      _id: new Binary(id.value),
    })

    if (!dto) return null

    Reflect.deleteProperty(dto, '_id')
    return dto
  }

  async persist(aggregate: A): Promise<void> {
    const { dto } = aggregate
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
