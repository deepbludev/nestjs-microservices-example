import { Email } from '@obeya/shared/core'
import { is } from '@obeya/shared/domain'

export class UserEmail extends Email {
  static errorMessage = 'UserEmail is not a valid email'
  static readonly is = is(this.name, this.validate, {
    message: this.errorMessage,
  })
}
