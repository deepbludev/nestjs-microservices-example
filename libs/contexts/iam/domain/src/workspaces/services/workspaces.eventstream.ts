import { Injectable } from '@nestjs/common'
import { IDomainEvent, IEventStream } from '@obeya/shared/core'

import { Workspace } from '../model/workspace.aggregate'

@Injectable()
export abstract class WorkspacesEventStream extends IEventStream<
  Workspace,
  IDomainEvent
> {}
