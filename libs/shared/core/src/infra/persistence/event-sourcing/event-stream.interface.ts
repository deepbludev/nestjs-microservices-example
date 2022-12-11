import { IAggregateRoot, IDomainEvent } from '../../../domain'

export abstract class IEventStream<
  A extends IAggregateRoot,
  E extends IDomainEvent = IDomainEvent
> {
  abstract append(events: E[], version: number): Promise<void>
  abstract store(aggregate: A, changes: E[]): Promise<void>
  abstract getEvents(aggId: A['id']): Promise<E[]>
  abstract version(aggId: A['id']): Promise<number>
  abstract readonly aggregate: string

  get name(): string {
    return this.aggregate + '.events'
  }
}
