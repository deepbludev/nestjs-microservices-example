import { UserId } from '@obeya/shared/domain'

import { UserDTO } from './user.dto'
import { UserEmail } from './user.email.vo'
import { UserPassword } from './user.password.vo'

export class UserDTOSchema implements UserDTO {
  @UserId.is id: string
  @UserEmail.is email: string
  @UserPassword.is password: string

  constructor(dto: UserDTO) {
    this.id = dto.id
    this.email = dto.email
    this.password = dto.password
  }
}
