import { PickType } from '@nestjs/swagger'

import { WorkspaceDTOSchema } from '../workspace.dto.schema'

export class CreateWorkspaceRequestDTOSchema extends PickType(
  WorkspaceDTOSchema,
  ['id', 'name', 'slug'] as const
) {}
