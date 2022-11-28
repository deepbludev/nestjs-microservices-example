import { Result } from '@obeya/shared/core'
import { is, Slug } from '@obeya/shared/domain'

export class WorkspaceSlug extends Slug {
  static readonly is = is(this.name, this.validate, {
    message: 'slug must be in kebab-case format',
  })

  static create(value: string): Result<WorkspaceSlug> {
    return super.create(value)
  }
}
