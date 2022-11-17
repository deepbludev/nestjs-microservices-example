import { IAggregateProps, IAggregateRoot, IUniqueID } from '@deepblu/ddd'

export abstract class AggregateRoot<
  I extends IUniqueID,
  P extends IAggregateProps,
  D extends { id: string }
> extends IAggregateRoot<I, P> {
  abstract get dto(): D
}
