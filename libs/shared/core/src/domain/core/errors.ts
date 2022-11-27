import { ICommand } from '../command/command.abstract'
import { ICommandHandler } from '../command/command-handler.abstract'
import { IEventSubscriber } from '../event/event-subscriber.interface'
import { IQuery } from '../query/query.abstract'
import { IQueryHandler } from '../query/query-handler.interface'

/**
 * @class InvalidPropError
 * @classdesc Error thrown when a property is invalid
 * @extends Error
 * @param {string} prop - The name of the invalid property
 * @param {string} details - The details of the error
 * @example
 * throw new InvalidPropError('foo', 'bar')
 * // => Error: foo: bar
 * @example
 * try {
 *   throw new InvalidPropError('foo', 'bar')
 * } catch (e) {
 *   console.log(e instanceof InvalidPropError) // => true
 * }
 */
export class InvalidPropError extends Error {
  constructor(public readonly prop: string, public readonly details: string) {
    super(`${prop}: ${details}`)
    this.name = InvalidPropError.name
  }

  static with(prop: string, details: string) {
    return new InvalidPropError(prop, details)
  }
}

export class AggregateAlreadyExistsError extends Error {
  constructor(public readonly id: string, public readonly aggregate: string) {
    super(`Aggregate ${aggregate} with id ${id} already exists`)
    this.name = AggregateAlreadyExistsError.name
  }

  static with(id: string, aggregate: string) {
    return new AggregateAlreadyExistsError(id, aggregate)
  }
}

export class CommandNotRegisteredError extends Error {
  constructor(public readonly command: ICommand) {
    super(`Command ${command.constructor.name} not registered`)
    this.name = CommandNotRegisteredError.name
  }

  static with(command: ICommand) {
    return new CommandNotRegisteredError(command)
  }
}

export class QueryNotRegisteredError extends Error {
  constructor(public readonly query: IQuery) {
    super(`Query ${query.constructor.name} not registered`)
    this.name = QueryNotRegisteredError.name
  }

  static with(query: IQuery) {
    return new QueryNotRegisteredError(query)
  }
}

export class EmptyEventSubscriberError extends Error {
  constructor(subscriber: IEventSubscriber) {
    super(
      `${subscriber.constructor.name} must be subscribed to at least one event`
    )
    this.name = EmptyEventSubscriberError.name
  }

  static with(subscriber: IEventSubscriber) {
    return new this(subscriber)
  }
}

export class EmptyCommandHandlerError extends Error {
  constructor(handler: ICommandHandler) {
    super(`${handler.constructor.name} is not subscribed to any command`)
    this.name = EmptyCommandHandlerError.name
  }

  static with(handler: ICommandHandler) {
    return new this(handler)
  }
}

export class EmptyQueryHandlerError extends Error {
  constructor(handler: IQueryHandler) {
    super(`${handler.constructor.name} is not subscribed to any query`)
    this.name = EmptyQueryHandlerError.name
  }

  static with(handler: IQueryHandler) {
    return new this(handler)
  }
}
