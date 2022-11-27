import {
  IAggregateRoot,
  IEventPublisherRepo,
  IUniqueID,
} from '@obeya/shared/core'

export class AggregateRepoMock<
  A extends IAggregateRoot
> extends IEventPublisherRepo<A> {
  readonly aggregates: Map<string, A> = new Map()

  protected async persist(entity: A): Promise<void> {
    this.aggregates.set(entity.id.value, entity)
  }

  async get(id: IUniqueID): Promise<A | null> {
    return this.aggregates.get(id.value) ?? null
  }
}
