import { Injectable } from '@nestjs/common'
import { Result } from '@obeya/shared/core'

import { CreateWorkspaceRequestDTO } from '../commands/create/create.workspace.dto'
import { WorkspaceCreated } from '../events/workspace.created.event'
import { Workspace } from '../model/workspace.aggregate'

@Injectable()
export class WorkspacesFactory {
  create({ id, ...props }: CreateWorkspaceRequestDTO): Result<Workspace> {
    const [workspaceId, ...results] = Workspace.createProps({ id, ...props })

    const result = Result.combine<Workspace>([workspaceId, ...results])
    if (result.isFail) return result

    const workspace = Workspace.createEmpty<Workspace>()
    const event: WorkspaceCreated = WorkspaceCreated.with(
      workspaceId.data,
      props
    )
    workspace.apply(event)

    return Result.ok(workspace)
  }

  static create(dto: CreateWorkspaceRequestDTO): Result<Workspace> {
    return new WorkspacesFactory().create(dto)
  }
}
