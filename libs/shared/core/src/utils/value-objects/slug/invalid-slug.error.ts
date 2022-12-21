import { InvalidStringError } from '../custom-string/invalid-string.error'

export class InvalidSlugError extends InvalidStringError {
  static withSlug(slug: string) {
    return this.with(
      `slug "${slug}" is invalid, it must be kebab-case with less than 64 characters`
    )
  }
  constructor() {
    super('slug must be alphanumeric kebab-case of less than 64 characthers')
  }
}
