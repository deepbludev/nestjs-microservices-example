import { DomainEvent, Payload, Props } from '@obeya/shared/core'

import { AggregateStub } from './aggregate.stub'

export class AggregateCreatedStub extends DomainEvent<Props<AggregateStub>> {
  static aggregate = 'AggregateStub'
}

export class PropsUpdatedStub extends DomainEvent<
  Partial<Payload<AggregateCreatedStub>>
> {
  static aggregate = 'AggregateStub'
}

export class AggregateToggledStub extends DomainEvent {
  static aggregate = 'AggregateStub'
}
