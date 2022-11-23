import { PickType } from '@nestjs/swagger'

import { UserDTOSchema } from '../../model/user.schema'

export class SignupUserRequestDTOSchema extends PickType(UserDTOSchema, [
  'id',
  'email',
  'password',
] as const) {}

export class SignupUserResponseDTOSchema extends PickType(UserDTOSchema, [
  'id',
] as const) {}
