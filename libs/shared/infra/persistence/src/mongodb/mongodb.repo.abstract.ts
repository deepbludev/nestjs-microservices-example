import {
  IAggregateRoot,
  IEventBus,
  IEventPublisherRepo,
  IUniqueID,
} from '@deepblu/ddd'

import { MongoDbService } from './mongodb.service'

export class IMongoDbRepo<
  A extends IAggregateRoot
> extends IEventPublisherRepo<A> {
  constructor(
    protected readonly client: MongoDbService,
    protected readonly eventbus: IEventBus
  ) {
    super(eventbus)
  }

  async get(id: IUniqueID): Promise<A> {
    throw new Error('Method not implemented.' + id.value)
  }

  protected async persist(aggregate: A): Promise<void> {
    console.log('persist:', aggregate)
    return null
  }
}
