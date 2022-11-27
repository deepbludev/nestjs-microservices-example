import { Constructor, IAggregateRoot } from '../../../../domain'
import { AggregateType } from '../aggregate.type'

export const eventstream = <A extends IAggregateRoot>(
  aggregate: AggregateType<A>
) =>
  function <T extends Constructor>(BaseClass: T) {
    const EventStoreClass = class extends BaseClass {
      aggregateClass: AggregateType<A> = aggregate
    }
    Reflect.defineProperty(EventStoreClass, 'name', { value: BaseClass.name })
    return EventStoreClass
  }
