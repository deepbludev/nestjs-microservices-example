import { Email, IAggregateRoot, Password } from '@deepblu/ddd'
import { UserId } from '@obeya/shared/domain'

import { SignupUserDTO } from '../commands/signup/signup.user.dto'
import { UserSignedUp } from '../events/user.signedup.event'

export class UserEmail extends Email {}
export class UserPassword extends Password {}

export class User extends IAggregateRoot<
  UserId,
  { email: UserEmail; password: UserPassword }
> {
  /**
   * Utility function to create a transaction's props from a transaction DTO.
   * @param dto
   * @returns an array of Result value objects
   */
  static createProps(dto: SignupUserDTO) {
    const { id, email, password } = dto
    const results = [
      UserId.from<UserId>(id),
      UserEmail.create(email),
      UserPassword.create(password),
    ] as const

    return results
  }

  protected onUserSignedUp(event: UserSignedUp) {
    const [id, email, password] = User.createProps({
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
