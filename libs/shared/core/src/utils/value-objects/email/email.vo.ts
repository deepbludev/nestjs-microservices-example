import { Result } from '../../../domain'
import { textUtils } from '../../text.utils'
import {
  CustomString,
  StringValidator,
  StringValidatorError,
} from '../custom-string/custom-string.vo'
import { InvalidEmailError } from './invalid-email.error'

export class Email extends CustomString {
  public static override readonly validate: StringValidator = (email: string) =>
    textUtils.isValidEmail(email)

  public static override readonly error: StringValidatorError = (
    email: string
  ) => InvalidEmailError.with(email)

  static override create<E extends Email>(
    value: string
  ): Result<E, InvalidEmailError> {
    const result = super.create(value)
    return result.isOk
      ? (result as Result<E, InvalidEmailError>)
      : Result.fail(this.error(value))
  }

  get domain(): string {
    return this.value.split('@')[1]
  }

  get username(): string {
    return this.value.split('@')[0]
  }

  get tld(): string {
    return this.domain.split('.').reverse()[0]
  }
}
