import { IAggregateRoot, IDomainEvent } from '../../../domain'
import { AggregateType } from './aggregate.type'

export abstract class IEventStream<
  A extends IAggregateRoot,
  E extends IDomainEvent = IDomainEvent
> {
  protected aggregateClass: AggregateType<A> = IAggregateRoot

  abstract append(aggId: string, events: E[], version: number): Promise<void>
  abstract get(aggId: string): Promise<E[]>
  abstract version(aggId: string): Promise<number>

  get aggregateName(): string {
    return this.aggregateClass.name
  }

  get name(): string {
    return `${this.aggregateName}.events`
  }
}
