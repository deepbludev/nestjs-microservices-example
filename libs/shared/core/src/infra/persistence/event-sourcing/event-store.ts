import {
  IAggregateRoot,
  IEventBus,
  IEventPublisherRepo,
  IUniqueID,
} from '../../../domain'
import { AggregateType } from './aggregate.type'
import { ConcurrencyError } from './errors/event-sourcing.errors'
import { IEventStream } from './event-stream.interface'

/**
 * Base abstract class for event stores.
 * It can be either extended or implemented as an interface.
 * It should be used to persist events in a stream
 */
export abstract class EventStore<
  A extends IAggregateRoot
> extends IEventPublisherRepo<A> {
  protected aggregateClass: AggregateType<A> = IAggregateRoot

  constructor(readonly stream: IEventStream<A>, eventbus: IEventBus) {
    super(eventbus)
  }

  protected async persist(aggregate: A): Promise<void> {
    const current = await this.version(aggregate.id)
    if (current !== aggregate.version)
      throw new ConcurrencyError(aggregate, current)

    const changes = aggregate.commit()
    await this.stream.store(aggregate, changes)
  }

  async get(id: IUniqueID): Promise<A | null> {
    const events = await this.stream.get(id)
    if (!events.length) return null
    return this.aggregateClass.rehydrate(id, events)
  }

  get name(): string {
    return this.aggregateClass.name
  }

  get aggregateName(): string {
    return this.aggregateClass.name
  }

  get streamName(): string {
    return this.stream.name
  }

  async version(aggrId: IUniqueID): Promise<number> {
    return await this.stream.version(aggrId)
  }
}
