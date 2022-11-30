/* eslint-disable @typescript-eslint/no-explicit-any */
import { Constructor, IMessage, IPayload } from '../types'
import { IUniqueID } from '../uid/unique-id.vo'

export interface IDomainEvent<P extends IPayload = IPayload>
  extends IMessage<P> {
  id: string
  name: string
  canonical: string
  aggregateName: string
  aggregateId: string
  timestamp: number // in milliseconds
}

export interface IDomainEventFactory<P extends IPayload = IPayload> {
  aggregate: string
  canonical: string
  dto<E extends IDomainEvent<P>>(event: E): IDomainEvent<P>
  with: (id: IUniqueID, payload: P) => any
  from: (event: any) => any
}

export type DomainEventClass<P extends IPayload = IPayload> = Constructor &
  IDomainEventFactory<P>
