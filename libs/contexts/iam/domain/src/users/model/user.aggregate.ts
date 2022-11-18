import { Email, Password } from '@deepblu/ddd'
import { AggregateRoot, UserId } from '@obeya/shared/domain'

import { SignupUserDTO } from '../commands/signup/signup.user.dto'
import { UserSignedUp } from '../events/user.signedup.event'
import { UserDTO } from './user.dto'

export class UserEmail extends Email {}
export class UserPassword extends Password {}

export interface UserProps {
  email: UserEmail
  password: UserPassword
}

export class User extends AggregateRoot<UserDTO, UserId, UserProps> {
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

  get dto(): UserDTO {
    return {
      id: this.id.value,
      email: this.email.value,
      password: this.password.value,
    }
  }

  static from(dto: UserDTO): User {
    const [id, email] = User.createProps(dto)
    const user = User.createEmpty<User>()
    user.id = id.data
    user.props.email = email.data
    user.props.password = UserPassword.fromEncrypted(dto.password)

    return user
  }
}
