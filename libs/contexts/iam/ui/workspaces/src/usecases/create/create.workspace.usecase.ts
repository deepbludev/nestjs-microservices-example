import {
  CreateWorkspace,
  CreateWorkspaceResponseDTO,
} from '@obeya/contexts/iam/domain'
import { Payload } from '@obeya/shared/core'
import { type Optional } from '@obeya/shared/core'
import { WorkspaceId } from '@obeya/shared/domain'
import { useCommand, UseCommandResponse } from '@obeya/shared/ui/utils'

export const useCreateWorkspace = (
  workspace: Optional<Payload<CreateWorkspace>, 'id'>
): UseCommandResponse<CreateWorkspaceResponseDTO> => {
  const payload = {
    ...workspace,
    id: workspace.id ?? WorkspaceId.create().value,
  }

  const response = useCommand<CreateWorkspaceResponseDTO>(
    CreateWorkspace.with(payload)
  )

  return response
}
