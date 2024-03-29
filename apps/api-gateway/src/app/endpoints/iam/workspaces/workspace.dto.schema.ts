import {
  WorkspaceDTO,
  WorkspaceName,
  WorkspaceSlug,
} from '@obeya/contexts/iam/domain'
import { WorkspaceId } from '@obeya/shared/domain'
import { IsNumber } from 'class-validator'

export class WorkspaceDTOSchema implements WorkspaceDTO {
  @WorkspaceId.is id: string
  @WorkspaceName.is name: string
  @WorkspaceSlug.is slug: string
  @IsNumber() version: number

  constructor(workspace: WorkspaceDTO) {
    this.id = workspace.id
    this.name = workspace.name
    this.slug = workspace.slug
    this.version = workspace.version
  }
}
