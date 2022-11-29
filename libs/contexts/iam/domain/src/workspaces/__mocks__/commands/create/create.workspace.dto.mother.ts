import { WorkspaceId } from '@obeya/shared/domain'

import { CreateWorkspaceRequestDTO } from '../../../commands/create/create.workspace.dto'

export const fakeCreateWorkspaceDTO = (
  dto?: Partial<CreateWorkspaceRequestDTO>
): CreateWorkspaceRequestDTO => ({
  id: dto?.id ?? '85d25856-efca-4d7d-9081-450c19b4f33a',
  name: dto?.name ?? 'Valid Workspace Name',
  slug: dto?.slug ?? 'valid-workspace-slug',
})

export const CreateWorkspaceMother = {
  fake: (
    dto?: Partial<CreateWorkspaceRequestDTO>
  ): CreateWorkspaceRequestDTO => ({
    id: dto?.id ?? '85d25856-efca-4d7d-9081-450c19b4f33a',
    name: dto?.name ?? 'Valid Workspace Name',
    slug: dto?.slug ?? 'valid-workspace-slug',
  }),

  random: (): CreateWorkspaceRequestDTO => ({
    id: WorkspaceId.create().value,
    name: 'Random Workspace Name',
    slug: 'random-workspace-slug',
  }),
}
