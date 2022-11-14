import { IAggregateRoot, Result } from '@deepblu/ddd'
import { UserId } from '@obeya/shared/domain'

import { SignupUserDTO } from '../commands/signup/signup.user.dto'

export class User extends IAggregateRoot<UserId, Omit<SignupUserDTO, 'id'>> {
  static create({ id, ...props }: SignupUserDTO): Result<User> {
    const user = new User(props, UserId.from(id).data)
    return Result.ok(user)
  }
}
