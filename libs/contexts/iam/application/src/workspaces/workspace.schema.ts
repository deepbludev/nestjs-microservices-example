import {
  WorkspaceDTO,
  WorkspaceName,
  WorkspaceSlug,
} from '@obeya/contexts/iam/domain'
import { WorkspaceId } from '@obeya/shared/domain'

export class WorkspaceDTOSchema implements WorkspaceDTO {
  @WorkspaceId.is id: string
  @WorkspaceName.is name: string
  @WorkspaceSlug.is slug: string
}