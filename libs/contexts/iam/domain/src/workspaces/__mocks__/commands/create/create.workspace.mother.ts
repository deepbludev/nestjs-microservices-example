import { MotherCreator, Slug } from '@obeya/shared/core'
import { WorkspaceId } from '@obeya/shared/domain'

import { CreateWorkspaceRequestDTO } from '../../../commands/create/create.workspace.dto'

export class CreateWorkspaceMother {
  static fake(
    dto?: Partial<CreateWorkspaceRequestDTO>
  ): CreateWorkspaceRequestDTO {
    return {
      id: dto?.id ?? 'cce2fded-90cd-4ec9-8806-842834e73e6c',
      name: dto?.name ?? 'Valid Workspace Name',
      slug: dto?.slug ?? 'valid-workspace-slug',
    }
  }

  static random(): CreateWorkspaceRequestDTO {
    const name = MotherCreator.faker().company.name()
    return this.fake({
      id: WorkspaceId.create().value,
      name,
      slug: Slug.toSlug(name),
    })
  }

  static invalid(
    dto?: Partial<CreateWorkspaceRequestDTO>
  ): CreateWorkspaceRequestDTO {
    return {
      id: dto?.id ?? 'invalid',
      name: '',
      slug: dto?.slug ?? 'Invalid Slug*',
    }
  }
}
