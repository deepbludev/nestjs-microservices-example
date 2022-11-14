import { DomainEvent, domainEvent } from '@deepblu/ddd'

@domainEvent('User')
export class UserSignedUp extends DomainEvent {}
