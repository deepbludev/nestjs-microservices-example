import { WorkspaceDTO } from '@obeya/contexts/iam/domain'
import { WorkspaceId } from '@obeya/shared/domain'

export class WorkspaceDTOSchema implements WorkspaceDTO {
  @WorkspaceId.is id: string
  name: string
  slug: string

  constructor(dto: WorkspaceDTO) {
    this.id = dto.id
    this.name = dto.name
    this.slug = dto.slug
  }
}
