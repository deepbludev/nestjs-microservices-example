import { Injectable } from '@nestjs/common'
import {
  Workspace,
  WorkspaceDTO,
  WorkspacesRepo,
} from '@obeya/contexts/iam/domain'
import { Nullable } from '@obeya/shared/core'
import { MongoDbRepo } from '@obeya/shared/infra/persistence'

@Injectable()
export class MongoDbWorkspacesRepo
  extends MongoDbRepo<Workspace, WorkspaceDTO>
  implements WorkspacesRepo
{
  aggregate = Workspace.name
  mapper = Workspace.from

  async findBySlug(slug: string): Promise<Nullable<Workspace>> {
    return (await this.findBy({ slug }))[0]
  }
}
