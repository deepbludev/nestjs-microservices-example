import { Result } from '../../../domain'
import { textUtils } from '../../text.utils'
import {
  CustomString,
  StringValidator,
  StringValidatorError,
} from '../custom-string/custom-string.vo'
import { BcryptJsPasswordEncrypter } from './encrypter/bcryptjs.password-encrypter'
import { PasswordEncrypter } from './encrypter/password-encrypter.interface'
import { InvalidPasswordError } from './invalid-password.error'

export class Password extends CustomString {
  protected static override readonly MIN: number = 10
  static readonly encrypter: PasswordEncrypter = new BcryptJsPasswordEncrypter()

  public static override readonly validate: StringValidator = (value: string) =>
    value?.length >= Password.MIN && value?.length <= Password.MAX

  public static override readonly error: StringValidatorError = (
    value: string
  ) =>
    InvalidPasswordError.with(
      `Password "${value}" is too short. ` +
        `It must be between ${Password.MIN} and ${Password.MAX} characters long.`
    )

  public static generate(length: number): string {
    return textUtils.randomString(length)
  }

  static override create(
    original: string
  ): Result<Password, InvalidPasswordError>
  static override create(
    original: string,
    validator: StringValidator,
    error: StringValidatorError
  ): Result<Password, InvalidPasswordError>
  static override create(
    original: string,
    validator?: StringValidator,
    error?: StringValidatorError
  ): Result<Password, InvalidPasswordError> {
    const result = validator ? validator(original) : this.isValid(original)
    const resultError = error ? error(original) : this.error(original)

    return result
      ? Result.ok(new this({ value: Password.encrypt(original) }))
      : Result.fail(resultError)
  }

  static fromEncrypted(encrypted: string): Password {
    return new Password({ value: encrypted })
  }

  static random(length?: number) {
    const l = length || this.MIN
    return this.generate(l > this.MIN ? l : this.MIN)
  }

  static encrypt(password: string): string {
    return this.encrypter.encrypt(password)
  }

  static isPassword(password: string | Password): password is Password {
    return password instanceof Password
  }

  compare(password: string): boolean
  compare(password: Password): boolean
  compare(password: string | Password): boolean {
    return Password.isPassword(password)
      ? this.value === password.value
      : this.encrypter.compare(password, this.value)
  }

  get encrypter() {
    return (this.constructor as typeof Password).encrypter
  }
}
