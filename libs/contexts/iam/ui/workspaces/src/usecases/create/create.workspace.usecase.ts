import {
  CreateWorkspace,
  CreateWorkspaceResponseDTO,
} from '@obeya/contexts/iam/application'
import { Payload } from '@obeya/shared/core'
import { type Optional } from '@obeya/shared/core'
import { UseCase, UseCommandResponse } from '@obeya/shared/ui/utils'

export type CreateWorkspaceRequest = Optional<Payload<CreateWorkspace>, 'id'>

export type CreateWorkspaceResponse =
  UseCommandResponse<CreateWorkspaceResponseDTO> &
    Partial<CreateWorkspaceResponseDTO>

export type CreateWorkspaceUseCase = UseCase<
  CreateWorkspaceRequest,
  CreateWorkspaceResponse
>
