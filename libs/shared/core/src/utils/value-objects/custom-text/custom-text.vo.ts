import {
  CustomString,
  StringValidator,
  StringValidatorError,
} from '../custom-string/custom-string.vo'
import { InvalidStringError } from '../custom-string/invalid-string.error'

export class CustomText extends CustomString {
  public static override readonly validate: StringValidator = value =>
    value?.length > 0

  public static override readonly error: StringValidatorError = () =>
    InvalidStringError.with('Custom text must not be empty')
}
