import { CustomString } from '@deepblu/ddd'
import { is } from '@obeya/shared/domain'

export class WorkspaceSlug extends CustomString {
  static readonly is = is(this.name, this.validate, {
    message: 'slug is not valid',
  })
}
