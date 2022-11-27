import { InvalidStringError } from '@obeya/shared/core'

export class InvalidSlugError extends InvalidStringError {
  static withSlug(slug: string) {
    return this.with(`Slug "${slug}" is invalid. It must be kebab-case.`)
  }
}
