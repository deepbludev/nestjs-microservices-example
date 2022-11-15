import { Result } from '@deepblu/ddd'
import { Injectable } from '@nestjs/common'

import { SignupUserDTO } from '../commands/signup/signup.user.dto'
import { UserSignedUp } from '../events/user.signedup.event'
import { createProps, User } from '../model/user.aggregate'

@Injectable()
export class UsersFactory {
  static signup({ id, ...props }: SignupUserDTO): Result<User> {
    const [userId, ...results] = createProps({ id, ...props })

    const result = Result.combine<User>([userId, ...results])
    if (result.isFail) return result

    const user = User.createEmpty<User>()
    const event: UserSignedUp = UserSignedUp.with(userId.data, props)
    user.apply(event)

    return Result.ok(user)
  }
}
