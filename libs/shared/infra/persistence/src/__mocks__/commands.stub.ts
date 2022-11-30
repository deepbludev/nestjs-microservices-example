import { Command, Props } from '@obeya/shared/core'

import { AggregateStub } from './aggregate.stub'

export class CreateAggregateStub extends Command<
  Props<AggregateStub> & { id: string }
> {}

export class UpdatePropsStub extends Command<
  Partial<Props<AggregateStub>> & { id: string }
> {}

export class ToggleAggregateStub extends Command<{ id: string }> {}
