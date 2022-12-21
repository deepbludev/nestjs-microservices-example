import { PickType } from '@nestjs/swagger'

import { WorkspaceDTOSchema } from '../workspace.schema'

export class CreateWorkspaceRequestDTOSchema extends PickType(
  WorkspaceDTOSchema,
  ['id', 'name', 'slug'] as const
) {}

export class CreateWorkspaceResponseDTOSchema extends PickType(
  WorkspaceDTOSchema,
  ['id'] as const
) {}
