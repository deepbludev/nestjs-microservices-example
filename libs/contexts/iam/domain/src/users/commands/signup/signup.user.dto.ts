import { PickType } from '@nestjs/swagger'

import { UserDTO } from '../../model/user.dto'

export class SignupUserRequestDTO extends PickType(UserDTO, [
  'id',
  'email',
  'password',
] as const) {}
