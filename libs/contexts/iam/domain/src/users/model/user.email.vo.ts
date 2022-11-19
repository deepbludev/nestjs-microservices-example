/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Email } from '@deepblu/ddd'
import { validator } from '@obeya/shared/domain'

export class UserEmail extends Email {
  static readonly invalidMessage = 'email is not valid'
}

export const IsUserEmail = validator(UserEmail.name, UserEmail.validate)
