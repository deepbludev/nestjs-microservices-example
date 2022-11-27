import { IUniqueID, UniqueIDProps } from './unique-id.vo'
import { customUID } from './utils/custom-uid.decorator'
import { uuid } from './utils/id.utils'

@customUID({ generator: uuid.create, validator: uuid.isValid })
export class UUID extends IUniqueID {
  constructor(props: UniqueIDProps) {
    super(props)
  }
}
