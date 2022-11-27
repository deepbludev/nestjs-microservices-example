import { CustomString, Result } from '@deepblu/ddd'
import { is } from '@obeya/shared/domain'

export class WorkspaceName extends CustomString {
  static readonly is = is(this.name, this.validate, {
    message: 'workspace name is not valid',
  })

  static create(value: string): Result<WorkspaceName> {
    return super.create(value)
  }
}
