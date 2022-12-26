import { CreateWorkspaceDTO, WorkspaceSchema } from '@obeya/contexts/iam/domain'
import { canonical, Command } from '@obeya/shared/domain'
import { z } from 'zod'

export const CreateWorkspaceRequestSchema = WorkspaceSchema.pick({
  id: true,
  name: true,
  slug: true,
})

export type CreateWorkspaceRequestDTO = z.infer<
  typeof CreateWorkspaceRequestSchema
>
export type CreateWorkspaceResponseDTO = Pick<CreateWorkspaceDTO, 'id'>

@canonical('cmd:iam.workspaces.create')
export class CreateWorkspace extends Command<CreateWorkspaceRequestDTO> {}
