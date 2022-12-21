import { Slug } from './slug.vo'

describe(Slug, () => {
  it('should not be valid if not kebab-case', () => {
    const text = 'not kebab case'
    expect(Slug.create(text).isOk).toBe(false)
    expect(Slug.validate(text)).toBe(false)
  })

  it('should be valid if not kebab-case', () => {
    const text = 'kebab-case'
    expect(Slug.create(text).isOk).toBe(true)
    expect(Slug.validate(text)).toBe(true)
  })

  it('should convert a given text to a valid slug', () => {
    const text = 'Text _ with_ InvaLid*    Chars'
    const expectedSlug = 'text-with-invalid-chars'
    const { isOk } = Slug.convert(text)

    expect(Slug.toSlug(text)).toEqual(expectedSlug)
    expect(isOk).toBe(true)
  })

  it('should not be valid if longer than 64 characters', () => {
    const text = 'a'.repeat(65)
    expect(Slug.create(text).isOk).toBe(false)
    expect(Slug.validate(text)).toBe(false)
  })
})
