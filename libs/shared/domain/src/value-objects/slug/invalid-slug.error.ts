export class InvalidSlugError extends Error {
  constructor(slug: string) {
    super(`Slug ${slug} is not kebab-case.`)
  }

  static with(slug: string) {
    return new InvalidSlugError(slug)
  }
}
