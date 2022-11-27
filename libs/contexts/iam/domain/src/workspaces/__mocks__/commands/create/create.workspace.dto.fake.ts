import { CreateWorkspaceRequestDTO } from '../../../commands/create/create.workspace.dto'

export const fakeCreateWorkspaceDTO = (
  dto?: Partial<CreateWorkspaceRequestDTO>
): CreateWorkspaceRequestDTO => ({
  id: dto?.id ?? '85d25856-efca-4d7d-9081-450c19b4f33a',
  name: dto?.name ?? 'Valid Workspace Name',
  slug: dto?.slug ?? 'valid-workspace-slug',
})
