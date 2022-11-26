import { InvalidStringError } from '@deepblu/ddd'

export class InvalidSlugError extends InvalidStringError {
  static withSlug(slug: string) {
    return this.with(`Slug "${slug}" is invalid. It must be kebab-case.`)
  }
}
