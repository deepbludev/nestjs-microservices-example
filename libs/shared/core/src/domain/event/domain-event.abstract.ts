import { textUtils as text } from '../../utils/text.utils'
import { IPayload, Payload } from '../types'
import { IUniqueID } from '../uid/unique-id.vo'
import { IDomainEvent } from './domain-event.interface'
import { DomainEventID } from './domain-event-id.vo'

export abstract class DomainEvent<P extends IPayload = IPayload>
  implements IDomainEvent<P>
{
  static aggregate = 'Aggregate'
  static get canonical(): string {
    const aggregate = text.camelToSnake(this.aggregate)
    const name = text.camelToSnake(this.name)
    return `${aggregate}.${name}`
  }

  constructor(
    public readonly payload: P,
    public readonly aggregateId: string,
    public readonly id: string = DomainEventID.create().value,
    public readonly timestamp: number = Date.now()
  ) {}

  /**
   * Creates a new DomainEvent from payload and aggregateId
   * @factory
   */
  static with<E extends DomainEvent>(id: IUniqueID, payload: Payload<E>): E {
    return Reflect.construct(this, [payload, id.value])
  }

  /**
   * Creates a new DomainEvent from a serialized event
   * @factory
   * @param dto - the serialized event usually coming from a message queue or persistance layer
   */
  static from<P extends IPayload>(dto: IDomainEvent<P>): DomainEvent<P> {
    const event = Reflect.construct(this, [dto.payload, dto.aggregateId])
    Reflect.set(event, 'timestamp', dto.timestamp)
    Reflect.set(event, 'id', dto.id)
    return event
  }

  /**
   * Serializes the event to a plain object.
   * Useful for persistance or sending over the wire.
   * @returns serialized version of the event.
   */
  get dto(): IDomainEvent<P> {
    return (this.constructor as typeof DomainEvent).dto(this)
  }

  static dto<E extends IDomainEvent>(event: E): IDomainEvent<Payload<E>> {
    return {
      id: event.id,
      name: event.name,
      canonical: event.canonical,
      timestamp: event.timestamp,
      aggregateId: event.aggregateId,
      aggregateName: event.aggregateName,
      payload: event.payload,
    }
  }

  get aggregateName(): string {
    let name = Reflect.get(this.constructor, 'aggregate')
    if (!name?.length) name = 'Aggregate'
    if (name === 'Aggregate')
      console.error(
        `[WARNING] DomainEvent "${this.name}" does not have an aggregate name. ` +
          'Using default name "Aggregate". ' +
          'Please set an aggregate name by using the @domainEvent decorator ' +
          'or by setting the static string property "aggregate" on the class.'
      )
    return name
  }

  get name(): string {
    return this.constructor.name
  }

  get canonical(): string {
    return (this.constructor as typeof DomainEvent).canonical
  }
}
