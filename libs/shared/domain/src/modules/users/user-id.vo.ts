import { UUID } from '@deepblu/ddd'

import { is } from '../../core/decorators/validator.decorator'

export class UserId extends UUID {
  static readonly is = is(this.name, this.validate, {
    message: 'user id must be a valid UUID',
  })
}
