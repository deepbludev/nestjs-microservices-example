import { AggregateDTO } from '@obeya/shared/domain'

export interface UserDTO extends AggregateDTO {
  email: string
  password: string
}
