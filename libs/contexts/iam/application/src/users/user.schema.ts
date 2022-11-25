import { UserDTO, UserEmail, UserPassword } from '@obeya/contexts/iam/domain'
import { UserId } from '@obeya/shared/domain'

export class UserDTOSchema implements UserDTO {
  @UserId.is id: string
  @UserEmail.is email: string
  @UserPassword.is password: string
}
