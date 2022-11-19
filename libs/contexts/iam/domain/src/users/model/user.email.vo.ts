import { Email } from '@deepblu/ddd'
import { is } from '@obeya/shared/domain'

export class UserEmail extends Email {
  static readonly invalidMessage = 'email is not valid'
  static readonly is = is(this.name, this.validate, {
    message: 'email is not valid',
  })
}
