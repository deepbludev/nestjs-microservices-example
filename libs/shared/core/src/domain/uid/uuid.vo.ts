import { IUniqueID } from './unique-id.vo'
import { type UniqueIDProps } from './unique-id.vo'
import { uuid } from './utils/id.utils'

export class UUID extends IUniqueID {
  constructor(props: UniqueIDProps) {
    super(props)
  }

  public static override validate(id: string): boolean {
    return uuid.isValid(id)
  }
}
