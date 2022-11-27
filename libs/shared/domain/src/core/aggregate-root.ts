import { IAggregateProps, IAggregateRoot, IUniqueID } from '@obeya/shared/core'

export abstract class AggregateRoot<
  D extends { id: string } = { id: string },
  I extends IUniqueID = IUniqueID,
  P extends IAggregateProps = IAggregateProps
> extends IAggregateRoot<I, P> {
  abstract get dto(): D
}
