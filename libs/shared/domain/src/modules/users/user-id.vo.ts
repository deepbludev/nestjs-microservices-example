import { UUID } from '@obeya/shared/core'

import { is } from '../../core/decorators/validator.decorator'

export class UserId extends UUID {
  static errorMessage = 'UserId must be a valid UUID'
  static readonly is = is(this.name, this.validate, {
    message: this.errorMessage,
  })
}
