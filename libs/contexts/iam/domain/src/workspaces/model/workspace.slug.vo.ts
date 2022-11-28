import { Result } from '@obeya/shared/core'
import { InvalidSlugError, is, Slug } from '@obeya/shared/domain'

export class WorkspaceSlug extends Slug {
  static readonly is = is(this.name, this.validate, {
    message: new InvalidSlugError().message,
  })

  static override create(value: string): Result<WorkspaceSlug> {
    return super.create(value)
  }
}
