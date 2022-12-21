import { AggregateDTO } from '@obeya/shared/domain'
// import { z } from 'zod'

// import { WorkspaceName } from './workspace.name.vo'
// import { WorkspaceSlug } from './workspace.slug.vo'

export interface WorkspaceDTO extends AggregateDTO {
  name: string
  slug: string
}

// export const WorkspaceDTOSchema = z.object({
//   id: z.string().refine(WorkspaceId.isValid),
//   name: z.string().refine(WorkspaceName.isValid),
//   slug: z.string().refine(WorkspaceSlug.isValid),
//   version: z.number().gte(-1),
// })
