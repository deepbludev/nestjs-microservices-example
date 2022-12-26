import { Password, Result } from '@obeya/shared/core'
import { is } from '@obeya/shared/domain'

export class UserPassword extends Password {
  static errorMessage = 'UserPassword must be at least 10 characters long'
  static readonly is = is(this.name, this.validate, {
    message: this.errorMessage,
  })

  static override create(value: string): Result<UserPassword> {
    return super.create(value)
  }
}
