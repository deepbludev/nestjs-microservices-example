import { Email, IAggregateRoot, Password, Result } from '@deepblu/ddd'
import { UserId } from '@obeya/shared/domain'

import { SignupUserDTO } from '../commands/signup/signup.user.dto'
import { UserSignedUp } from '../events/user.signedup.event'

export class UserEmail extends Email {}
export class UserPassword extends Password {}

/**
 * Utility function to create a transaction's props from a transaction DTO.
 * @param dto
 * @returns
 */
function createProps(dto: SignupUserDTO) {
  const { id, email, password } = dto
  const results = [
    UserId.from<UserId>(id),
    UserEmail.create(email),
    UserPassword.create(password),
  ] as const

  return results
}

export class User extends IAggregateRoot<
  UserId,
  { email: UserEmail; password: UserPassword }
> {
  static signup({ id, ...props }: SignupUserDTO): Result<User> {
    const [userId, ...results] = createProps({ id, ...props })

    const result = Result.combine<User>([userId, ...results])
    if (result.isFail) return result

    const user = User.createEmpty<User>()
    const event: UserSignedUp = UserSignedUp.with(userId.data, props)
    user.apply(event)

    return Result.ok(user)
  }

  protected onUserSignedUp(event: UserSignedUp) {
    const [id, email, password] = createProps({
      ...event.payload,
      id: event.aggregateId,
    })
    this.id = id.data
    this.props.email = email.data
    this.props.password = password.data
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }
}
