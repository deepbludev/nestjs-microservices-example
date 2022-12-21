import { Injectable } from '@nestjs/common'
import {
  CreateWorkspace,
  WorkspaceIdAlreadyExistsError,
  WorkspacesFactory,
  WorkspaceSlugAlreadyInUseError,
  WorkspacesRepo,
} from '@obeya/contexts/iam/domain'
import {
  commandHandler,
  CommandResponse,
  ICommandHandler,
  Result,
} from '@obeya/shared/core'

@Injectable()
@commandHandler(CreateWorkspace)
export class CreateWorkspaceHandler extends ICommandHandler<CreateWorkspace> {
  constructor(
    private readonly repo: WorkspacesRepo,
    private readonly factory: WorkspacesFactory
  ) {
    super()
  }
  async handle(command: CreateWorkspace): CommandResponse {
    const {
      data: workspace,
      isFail,
      error,
    } = this.factory.create(command.payload)
    if (isFail) return Result.fail(error)

    if (await this.repo.exists(workspace.id))
      return Result.fail(new WorkspaceIdAlreadyExistsError(workspace.id.value))

    if (await this.repo.findBySlug(workspace.slug.value))
      return Result.fail(
        new WorkspaceSlugAlreadyInUseError(workspace.slug.value)
      )

    this.repo.save(workspace)
    return Result.ok()
  }
}
