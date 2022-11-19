import { PickType } from '@nestjs/swagger'

import { UserDTO } from '../../model/user.dto'

export class SignupUserResponseDTO extends PickType(UserDTO, ['id'] as const) {}
