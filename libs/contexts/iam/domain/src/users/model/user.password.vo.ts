import { Password, Result } from '@obeya/shared/core'
import { is } from '@obeya/shared/domain'

export class UserPassword extends Password {
  static readonly is = is(this.name, this.validate, {
    message: 'password must be at least 10 characters long',
  })

  static override create(value: string): Result<UserPassword> {
    return super.create(value)
  }
}
