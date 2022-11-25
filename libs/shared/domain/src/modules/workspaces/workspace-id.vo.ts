import { UUID } from '@deepblu/ddd'

import { is } from '../../core/decorators/validator.decorator'

export class WorkspaceId extends UUID {
  static readonly is = is(this.name, this.validate, {
    message: 'workspace id must be a valid UUID',
  })
}
