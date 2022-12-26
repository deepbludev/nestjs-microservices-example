import { CustomString, Result } from '@obeya/shared/core'
import { is } from '@obeya/shared/domain'

export class WorkspaceName extends CustomString {
  static errorMessage = 'WorkspaceName is not valid'
  static readonly is = is(this.name, this.validate, {
    message: this.errorMessage,
  })

  static override create(value: string): Result<WorkspaceName> {
    return super.create(value)
  }
}
