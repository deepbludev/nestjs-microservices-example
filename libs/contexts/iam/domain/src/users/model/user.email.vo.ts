import { Email } from '@obeya/shared/core'
import { is } from '@obeya/shared/domain'

export class UserEmail extends Email {
  static readonly is = is(this.name, this.validate, {
    message: 'email is not valid',
  })
}
