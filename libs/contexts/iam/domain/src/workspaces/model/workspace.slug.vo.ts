import { InvalidSlugError, Result, Slug } from '@obeya/shared/core'
import { is } from '@obeya/shared/domain'

export class WorkspaceSlug extends Slug {
  static errorMessage = `WorkspaceS${new InvalidSlugError().message.slice(1)}`
  static readonly is = is(this.name, this.validate, {
    message: this.errorMessage,
  })

  static override create(value: string): Result<WorkspaceSlug> {
    return super.create(value)
  }
}
