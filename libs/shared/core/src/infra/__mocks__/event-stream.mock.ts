import { IDomainEvent } from '../../domain'
import { AggregateStub } from '../../domain/__mocks__'
import { IEventStream } from '../persistence/event-sourcing/event-stream.interface'

export class EventStreamMock extends IEventStream<AggregateStub> {
  aggregate = AggregateStub.name

  readonly snapshots: Map<string, AggregateStub> = new Map()
  readonly events: Map<string, { events: IDomainEvent[]; version: number }> =
    new Map()

  async append(
    aggId: AggregateStub['id'],
    events: IDomainEvent[],
    version: number
  ) {
    const prev = this.events.get(aggId.value)?.events || []
    this.events.set(aggId.value, { events: prev.concat(events), version })
  }

  async version(aggId: AggregateStub['id']): Promise<number> {
    return this.events.get(aggId.value)?.version ?? -1
  }

  async getEvents(aggId: AggregateStub['id']): Promise<IDomainEvent[]> {
    return (
      this.events
        .get(aggId.value)
        ?.events.filter(e => e.aggregateId === aggId.value) || []
    )
  }

  async store(
    aggregate: AggregateStub,
    changes: IDomainEvent[]
  ): Promise<void> {
    this.snapshots.set(aggregate.id.value, aggregate)
    this.append(aggregate.id, changes, aggregate.version)
  }
}
