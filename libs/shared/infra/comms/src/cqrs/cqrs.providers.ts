import { Type } from '@nestjs/common'
import {
  ICommandBus,
  ICommandHandler,
  IEventBus,
  IEventSubscriber,
  IQueryBus,
  IQueryHandler,
} from '@obeya/shared/core'

import { CommandBus } from './commandbus'
import { CQRS } from './cqrs.tokens'
import { EventBus } from './eventbus'
import { QueryBus } from './querybus'

export const commandProviders = (
  commandHandlers,
  useCommandBusClass: Type<ICommandBus> = CommandBus
) => [
  ...commandHandlers,
  {
    provide: CQRS.COMMAND_HANDLERS,
    useFactory: (...handlers: ICommandHandler[]) => handlers,
    inject: commandHandlers,
  },
  { provide: ICommandBus, useClass: useCommandBusClass },
]

export const queryProviders = (
  queryHandlers,
  useQueryBusClass: Type<IQueryBus> = QueryBus
) => [
  ...queryHandlers,
  {
    provide: CQRS.QUERY_HANDLERS,
    useFactory: (...handlers: IQueryHandler[]) => handlers,
    inject: queryHandlers,
  },
  { provide: IQueryBus, useClass: useQueryBusClass },
]

export const eventProviders = (
  eventSubscribers,
  useEventBusClass: Type<IEventBus> = EventBus
) => [
  ...eventSubscribers,
  {
    provide: CQRS.EVENT_SUBSCRIBERS,
    useFactory: (...subscribers: IEventSubscriber[]) => subscribers,
    inject: eventSubscribers,
  },
  { provide: IEventBus, useClass: useEventBusClass },
]
