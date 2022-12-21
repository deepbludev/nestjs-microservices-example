import { Result } from '../../../domain'
import {
  CustomString,
  StringValidator,
  StringValidatorError,
} from '../custom-string/custom-string.vo'
import { InvalidSlugError } from './invalid-slug.error'

export class Slug extends CustomString {
  public static override readonly validate: StringValidator = value =>
    /^[a-z0-9-]+$/.test(value) && value?.length > 0 && value?.length <= 64

  public static override readonly error: StringValidatorError = () =>
    new InvalidSlugError()

  public static toSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .split('')
      .filter((c, i, s) => !(c === '-' && s[i + 1] === '-'))
      .join('')
  }

  public static convert(text: string): Result<Slug, InvalidSlugError> {
    return Slug.create(Slug.toSlug(text))
  }
}
