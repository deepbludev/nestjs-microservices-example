import { Inject, Injectable } from '@nestjs/common'
import { IEventSubscriber, InMemoryAsyncEventBus } from '@obeya/shared/core'

import { CQRS } from './cqrs.tokens'

@Injectable()
export class EventBus extends InMemoryAsyncEventBus {
  constructor(
    @Inject(CQRS.EVENT_SUBSCRIBERS)
    private readonly eventSubscribers: IEventSubscriber[]
  ) {
    super()
    this.register(this.eventSubscribers)
  }
}
