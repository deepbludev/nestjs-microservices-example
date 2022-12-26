import { Injectable } from '@nestjs/common'
import { Result } from '@obeya/shared/core'

import { UserSignedUp } from '../events/user.signedup.event'
import { User } from '../model/user.aggregate'
import { CreateUserDTO } from '../model/user.dto'

@Injectable()
export class UsersFactory {
  create({ id, ...props }: CreateUserDTO): Result<User> {
    const [userId, ...results] = User.createProps({ id, ...props })

    const result = Result.combine<User>([userId, ...results])
    if (result.isFail) return result

    const user = User.createEmpty<User>()
    const event: UserSignedUp = UserSignedUp.with(userId.data, props)
    user.apply(event)

    return Result.ok(user)
  }

  static create(dto: CreateUserDTO): Result<User> {
    return new UsersFactory().create(dto)
  }
}
