import { DomainEvent, IAggregateRoot } from '../../../domain'

export abstract class IEventStream<
  A extends IAggregateRoot,
  E extends DomainEvent = DomainEvent
> {
  abstract append(aggId: A['id'], events: E[], version: number): Promise<void>
  abstract store(aggregate: A, changes: E[]): Promise<void>
  abstract get(aggId: A['id']): Promise<E[]>
  abstract version(aggId: A['id']): Promise<number>
  abstract readonly aggregate: string

  get name(): string {
    return this.aggregate + '.events'
  }
}
