import { PickType } from '@nestjs/swagger'

import { UserDTOSchema } from '../user.dto.schema'

export class SignupUserRequestDTOSchema extends PickType(UserDTOSchema, [
  'id',
  'email',
  'password',
] as const) {}
