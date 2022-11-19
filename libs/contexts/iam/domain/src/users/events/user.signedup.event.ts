import { DomainEvent, domainEvent } from '@deepblu/ddd'

import { SignupUserRequestDTO } from '../commands/signup/signup.user.dto'

@domainEvent('User')
export class UserSignedUp extends DomainEvent<
  Omit<SignupUserRequestDTO, 'id'>
> {}
