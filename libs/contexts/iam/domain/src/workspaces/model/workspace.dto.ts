import { AggregateDTO, WorkspaceId } from '@obeya/shared/domain'
import { z } from 'zod'

import { WorkspaceName } from './workspace.name.vo'
import { WorkspaceSlug } from './workspace.slug.vo'

export const WorkspaceSchema = z.object({
  id: z
    .string()
    .refine(WorkspaceId.isValid, { message: WorkspaceId.errorMessage }),
  name: z
    .string()
    .refine(WorkspaceName.isValid, { message: WorkspaceName.errorMessage }),
  slug: z
    .string()
    .refine(WorkspaceSlug.isValid, { message: WorkspaceSlug.errorMessage }),
  version: z.number().gte(-1),
})

export type WorkspaceDTO = z.infer<typeof WorkspaceSchema> & AggregateDTO

/** Create Workspace */
export type CreateWorkspaceDTO = Pick<WorkspaceDTO, 'id' | 'name' | 'slug'>
