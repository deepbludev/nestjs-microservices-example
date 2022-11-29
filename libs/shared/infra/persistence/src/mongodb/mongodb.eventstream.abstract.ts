/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common'
import { DomainEvent, IEventStream } from '@obeya/shared/core'
import { AggregateRoot } from '@obeya/shared/domain'

import { MongoDbService } from './mongodb.service'
import { MongoDTO } from './mongodb.types'

@Injectable()
export abstract class MongoDbEventStream<
  A extends AggregateRoot<DTO>,
  DTO extends MongoDTO,
  E extends DomainEvent = DomainEvent
> extends IEventStream<A, DomainEvent> {
  abstract readonly aggregate: string
  abstract mapper(dto: DTO): A

  constructor(protected readonly client: MongoDbService) {
    super()
  }

  append(aggregateId: A['id'], events: E[], version: number): Promise<void> {
    throw new Error('Method not implemented.' + aggregateId + events + version)
  }

  store(aggregate: A, changes: E[]): Promise<void> {
    throw new Error('Method not implemented.' + aggregate + changes)
  }
  get(aggregateId: A['id']): Promise<E[]> {
    throw new Error('Method not implemented.' + aggregateId)
  }
  version(aggregateId: A['id']): Promise<number> {
    throw new Error('Method not implemented.' + aggregateId)
  }
}
