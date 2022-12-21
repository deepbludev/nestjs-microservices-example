import { Inject, Injectable } from '@nestjs/common'
import { InMemoryQueryBus, IQueryHandler } from '@obeya/shared/core'

import { CQRS } from './cqrs.tokens'

@Injectable()
export class QueryBus extends InMemoryQueryBus {
  constructor(
    @Inject(CQRS.QUERY_HANDLERS)
    private readonly queryHandlers: IQueryHandler[]
  ) {
    super()
    this.register(this.queryHandlers)
  }
}
