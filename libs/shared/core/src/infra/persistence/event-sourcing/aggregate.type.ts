import { IAggregateRoot, IDomainEvent, IUniqueID } from '../../../domain'

export interface AggregateType<A extends IAggregateRoot> {
  name: string
  rehydrate: (id: IUniqueID, events: IDomainEvent[]) => A
}
