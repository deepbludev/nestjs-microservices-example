import { DomainEvent, IAggregateRoot, IUniqueID } from '../../../domain'

export interface AggregateType<A extends IAggregateRoot> {
  name: string
  rehydrate: (id: IUniqueID, events: DomainEvent[]) => A
}
