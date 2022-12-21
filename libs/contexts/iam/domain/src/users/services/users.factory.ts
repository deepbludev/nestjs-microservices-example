import { Injectable } from '@nestjs/common'
import { Result } from '@obeya/shared/core'

import { SignupUserRequestDTO } from '../commands/signup/signup.user.dto'
import { UserSignedUp } from '../events/user.signedup.event'
import { User } from '../model/user.aggregate'

@Injectable()
export class UsersFactory {
  create({ id, ...props }: SignupUserRequestDTO): Result<User> {
    const [userId, ...results] = User.createProps({ id, ...props })

    const result = Result.combine<User>([userId, ...results])
    if (result.isFail) return result

    const user = User.createEmpty<User>()
    const event: UserSignedUp = UserSignedUp.with(userId.data, props)
    user.apply(event)

    return Result.ok(user)
  }

  static create(dto: SignupUserRequestDTO): Result<User> {
    return new UsersFactory().create(dto)
  }
}
