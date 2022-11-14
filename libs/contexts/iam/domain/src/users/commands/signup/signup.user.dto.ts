import { PickType } from '@nestjs/swagger'

import { UserDTO } from '../../model/user.dto'

export class SignupUserDTO extends PickType(UserDTO, [
  'id',
  'email',
  'password',
] as const) {}
