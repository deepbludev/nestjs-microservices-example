import { CustomString } from '@deepblu/ddd'
import { is } from '@obeya/shared/domain'

export class WorkspaceName extends CustomString {
  static readonly is = is(this.name, this.validate, {
    message: 'name is not valid',
  })
}
