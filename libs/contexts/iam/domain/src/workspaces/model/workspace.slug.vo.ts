import { is, Slug } from '@obeya/shared/domain'

export class WorkspaceSlug extends Slug {
  static readonly is = is(this.name, this.validate, {
    message: 'workspace slug is not valid',
  })
}
