import { WorkspaceDTO } from '../../model/workspace.dto'

export type CreateWorkspaceRequestDTO = Pick<
  WorkspaceDTO,
  'id' | 'name' | 'slug'
>

export type CreateWorkspaceResponseDTO = Pick<WorkspaceDTO, 'id'>
