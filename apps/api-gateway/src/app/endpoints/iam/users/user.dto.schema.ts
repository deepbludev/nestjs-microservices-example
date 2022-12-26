import { UserDTO, UserEmail, UserPassword } from '@obeya/contexts/iam/domain'
import { UserId } from '@obeya/shared/domain'
import { IsNumber } from 'class-validator'

export class UserDTOSchema implements UserDTO {
  @UserId.is id: string
  @UserEmail.is email: string
  @UserPassword.is password: string
  @IsNumber() version: number

  constructor(user: UserDTO) {
    this.id = user.id
    this.email = user.email
    this.password = user.password
    this.version = user.version
  }
}
