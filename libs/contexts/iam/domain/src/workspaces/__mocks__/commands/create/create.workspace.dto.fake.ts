import { CreateWorkspaceRequestDTO } from '../../../commands/create/create.workspace.dto'

export const fakeCreateWorkspaceDTO = (
  dto?: Partial<CreateWorkspaceRequestDTO>
): CreateWorkspaceRequestDTO => ({
  id: dto?.id ?? 'cce2fded-90cd-4ec9-8806-842834e73e6c',
  name: dto?.name ?? 'Valid Workspace Name',
  slug: dto?.slug ?? 'valid-workspace-slug',
})
