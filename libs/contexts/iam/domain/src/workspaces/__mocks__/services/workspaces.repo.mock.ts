import { AggregateRepoMock } from '@obeya/shared/domain'

import { Workspace } from '../../model/workspace.aggregate'
import { WorkspacesRepo } from '../../services/workspaces.repo'

export class WorkspacesRepoMock
  extends AggregateRepoMock<Workspace>
  implements WorkspacesRepo
{
  findBySlug: (email: string) => Promise<Workspace | null> = jest.fn()
  clear() {
    this.aggregates.clear()
  }
}
