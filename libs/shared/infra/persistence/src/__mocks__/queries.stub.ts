import { Props, Query } from '@obeya/shared/core'

import { AggregateStub } from './aggregate.stub'

export class AllAggregatesStub extends Query {}

export class FilteredAggregatesStub extends Query<
  Partial<Props<AggregateStub>>
> {}

export class ToggledAggregatesStub extends Query {}
