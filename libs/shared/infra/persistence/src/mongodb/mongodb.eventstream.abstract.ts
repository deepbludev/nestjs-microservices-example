/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common'
import { DomainEvent, IEventStream } from '@obeya/shared/core'
import { AggregateRoot } from '@obeya/shared/domain'

import { MongoDbService } from './mongodb.service'
import { MongoDTO } from './mongodb.types'

@Injectable()
export abstract class MongoDbEventStream<
  A extends AggregateRoot<DTO>,
  DTO extends MongoDTO
> extends IEventStream<A, DomainEvent> {
  abstract readonly aggregate: string
  abstract mapper(dto: DTO): A

  constructor(protected readonly client: MongoDbService) {
    super()
  }
}
