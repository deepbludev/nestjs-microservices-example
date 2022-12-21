import { WorkspaceCreated } from '@obeya/contexts/iam/domain'
import { eventSubscriber, IEventSubscriber } from '@obeya/shared/core'

@eventSubscriber(WorkspaceCreated)
export class WorkspaceCreatedSubscriber extends IEventSubscriber {
  async on(event: WorkspaceCreated): Promise<void> {
    console.log({ event })
  }
}
