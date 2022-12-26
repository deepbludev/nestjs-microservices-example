import { AggregateRoot, UserId } from '@obeya/shared/domain'

import { UserSignedUp } from '../events/user.signedup.event'
import { CreateUserDTO, UserDTO } from './user.dto'
import { UserEmail } from './user.email.vo'
import { UserPassword } from './user.password.vo'

export interface UserProps {
  email: UserEmail
  password: UserPassword
}

export class User extends AggregateRoot<UserDTO, UserId, UserProps> {
  static createProps(dto: CreateUserDTO) {
    const { id, email, password } = dto
    const results = [
      UserId.from<UserId>(id),
      UserEmail.create(email),
      UserPassword.create(password),
    ] as const

    return results
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
      version: this.version,
    }
  }

  static from(dto: UserDTO): User {
    const [id, email] = User.createProps(dto)
    const user = User.createEmpty<User>()
    user.id = id.data
    user._version = dto.version
    user.props.email = email.data
    user.props.password = UserPassword.fromEncrypted(dto.password)

    return user
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
}
