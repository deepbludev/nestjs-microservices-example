import {
  CustomNumber,
  NumberValidator,
  NumberValidatorError,
} from '../custom-number/custom-number.vo'
import { InvalidNumberError } from '../custom-number/invalid-number.error'

export class NonNegativeNumber extends CustomNumber {
  public static override readonly validate: NumberValidator = (value: number) =>
    value >= 0

  public static override readonly error: NumberValidatorError = (
    value: number
  ) =>
    InvalidNumberError.with(`Number must be greater than 0. Received: ${value}`)
}
