import { Injectable } from '@nestjs/common'
import {
  Workspace,
  WorkspacesEventStream,
  WorkspacesRepo,
} from '@obeya/contexts/iam/domain'
import { EventStore, eventstore, IEventBus } from '@obeya/shared/core'

@Injectable()
@eventstore(Workspace)
export class WorkspacesEventStore
  extends EventStore<Workspace>
  implements WorkspacesRepo
{
  constructor(stream: WorkspacesEventStream, eventbus: IEventBus) {
    super(stream, eventbus)
  }

  findBySlug(email: string): Promise<Workspace> {
    throw new Error('Method not implemented: ' + email)
  }
}
