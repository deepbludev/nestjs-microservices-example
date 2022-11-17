import { DomainEvent, domainEvent } from '@deepblu/ddd'

import { SignupUserDTO } from '../commands/signup/signup.user.dto'

@domainEvent('User')
export class UserSignedUp extends DomainEvent<Omit<SignupUserDTO, 'id'>> {}
