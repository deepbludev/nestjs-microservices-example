import { IAggregateProps, IAggregateRoot, IUniqueID } from '@deepblu/ddd'

export abstract class AggregateRoot<
  I extends IUniqueID = IUniqueID,
  P extends IAggregateProps = IAggregateProps,
  D extends { id: string } = { id: string }
> extends IAggregateRoot<I, P> {
  abstract get dto(): D
}
