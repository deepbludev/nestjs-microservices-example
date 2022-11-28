import {
  CreateWorkspace,
  CreateWorkspaceResponseDTO,
} from '@obeya/contexts/iam/domain'
import { Payload } from '@obeya/shared/core'
import { type Optional } from '@obeya/shared/core'
import { WorkspaceId } from '@obeya/shared/domain'
import { useCommand, UseCommandResponse } from '@obeya/shared/ui/utils'

export type CreateWorkspaceRequest = Optional<Payload<CreateWorkspace>, 'id'>

export type CreateWorkspaceResponse = Omit<
  UseCommandResponse<CreateWorkspaceResponseDTO>,
  'result'
> & {
  id: string | undefined
}

export const useCreateWorkspace = (
  workspace: CreateWorkspaceRequest
): CreateWorkspaceResponse => {
  const payload = {
    ...workspace,
    id: workspace.id ?? WorkspaceId.create().value,
  }

  const { result, ...rest } = useCommand<CreateWorkspaceResponseDTO>(
    CreateWorkspace.with(payload)
  )

  return { id: result?.data?.id, ...rest }
}
