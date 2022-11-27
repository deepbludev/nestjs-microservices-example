import { Result } from '@deepblu/ddd'
import { is, Slug } from '@obeya/shared/domain'

export class WorkspaceSlug extends Slug {
  static readonly is = is(this.name, this.validate, {
    message: 'workspace slug is not valid',
  })

  static create(value: string): Result<WorkspaceSlug> {
    return super.create(value)
  }
}
