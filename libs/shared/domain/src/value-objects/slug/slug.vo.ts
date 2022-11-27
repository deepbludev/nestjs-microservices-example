import { CustomString, customString, Result } from '@obeya/shared/core'

import { InvalidSlugError } from './invalid-slug.error'

@customString({
  validator: value => !!value.match(/^[a-z0-9-]+$/),
  error: () => InvalidSlugError.with('Slug must be alphanumeric kebab-case.'),
})
export class Slug extends CustomString {
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
