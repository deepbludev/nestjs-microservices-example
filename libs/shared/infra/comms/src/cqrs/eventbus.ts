import { IEventSubscriber, InMemoryAsyncEventBus } from '@deepblu/ddd'
import { Inject, Injectable } from '@nestjs/common'

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
