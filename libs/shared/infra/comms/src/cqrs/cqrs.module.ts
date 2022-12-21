import { DynamicModule, ForwardReference, Type } from '@nestjs/common'
import {
  ICommandBus,
  ICommandHandler,
  IEventBus,
  IEventSubscriber,
  IQueryBus,
  IQueryHandler,
} from '@obeya/shared/core'

import { CommandBus } from './commandbus'
import {
  commandProviders,
  eventProviders,
  queryProviders,
} from './cqrs.providers'
import { EventBus } from './eventbus'
import { QueryBus } from './querybus'

interface CqrsModuleOptions {
  imports?: (Type | DynamicModule | Promise<DynamicModule> | ForwardReference)[]
  commandHandlers?: Type<ICommandHandler>[]
  useCommandBusClass?: Type<ICommandBus>
  queryHandlers?: Type<IQueryHandler>[]
  useQueryBusClass?: Type<IQueryBus>

  eventSubscribers?: Type<IEventSubscriber>[]
  useEventBusClass?: Type<IEventBus>
}

export class CqrsModule {
  static forRoot({
    imports,
    commandHandlers = [],
    useCommandBusClass = CommandBus,
    queryHandlers = [],
    useQueryBusClass = QueryBus,
    eventSubscribers = [],
    useEventBusClass = EventBus,
  }: CqrsModuleOptions): DynamicModule {
    const providers = []
    const exports = []

    if (commandHandlers?.length) {
      providers.push(...commandProviders(commandHandlers, useCommandBusClass))
      exports.push(ICommandBus)
    }

    if (queryHandlers?.length) {
      providers.push(...queryProviders(queryHandlers, useQueryBusClass))
      exports.push(IQueryBus)
    }

    if (eventSubscribers?.length) {
      providers.push(...eventProviders(eventSubscribers, useEventBusClass))
      exports.push(IEventBus)
    }

    return {
      module: CqrsModule,
      global: true,
      imports,
      providers,
      exports,
    }
  }
}
