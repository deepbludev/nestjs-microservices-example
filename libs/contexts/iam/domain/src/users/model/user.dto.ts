import { UserId } from '@obeya/shared/domain'

import { UserEmail } from './user.email.vo'
import { UserPassword } from './user.password.vo'

export class UserDTO {
  @UserId.is
  id: string

  @UserEmail.is
  email: string

  @UserPassword.is
  password: string
}
