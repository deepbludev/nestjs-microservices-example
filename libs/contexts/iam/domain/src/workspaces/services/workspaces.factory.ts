import { Injectable } from '@nestjs/common'
import { Result } from '@obeya/shared/core'

import { WorkspaceCreated } from '../events/workspace.created.event'
import { Workspace } from '../model/workspace.aggregate'
import { CreateWorkspaceDTO } from '../model/workspace.dto'

@Injectable()
export class WorkspacesFactory {
  create({ id, ...props }: CreateWorkspaceDTO): Result<Workspace> {
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

  static create(dto: CreateWorkspaceDTO): Result<Workspace> {
    return new WorkspacesFactory().create(dto)
  }
}
