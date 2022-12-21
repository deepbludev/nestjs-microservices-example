import { IAggregateProps, IAggregateRoot, IUniqueID } from '@obeya/shared/core'

export interface AggregateDTO {
  id: string
  version: number
}

export abstract class AggregateRoot<
  D extends AggregateDTO = AggregateDTO,
  I extends IUniqueID = IUniqueID,
  P extends IAggregateProps = IAggregateProps
> extends IAggregateRoot<I, P> {
  abstract get dto(): D
}
