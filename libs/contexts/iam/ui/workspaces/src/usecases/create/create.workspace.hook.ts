import {
  CreateWorkspace,
  CreateWorkspaceResponseDTO,
} from '@obeya/contexts/iam/application'
import { WorkspaceId } from '@obeya/shared/domain'
import { useCommand } from '@obeya/shared/ui/utils'

import { CreateWorkspaceUseCase } from './create.workspace.usecase'

export const useCreateWorkspace: CreateWorkspaceUseCase = workspace => {
  const payload = {
    ...workspace,
    id: workspace.id ?? WorkspaceId.create().value,
  }

  const { result, ...rest } = useCommand<CreateWorkspaceResponseDTO>(
    CreateWorkspace.with(payload)
  )

  return { id: result?.data?.id, result, ...rest }
}
