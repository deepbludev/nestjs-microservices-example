import { DomainEvent, domainEvent } from '@obeya/shared/core'

import { CreateUserDTO } from '../model/user.dto'

@domainEvent('User')
export class UserSignedUp extends DomainEvent<Omit<CreateUserDTO, 'id'>> {}
