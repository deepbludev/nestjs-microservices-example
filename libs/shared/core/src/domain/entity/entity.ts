import { UUID } from '../uid/uuid.vo'
import { IEntity, IEntityProps } from './entity.abstract'
import { unique } from './utils/unique.decorator'

/**
 * @class Entity
 * Entity class using UUID as ID.
 */
@unique(UUID)
export class Entity<P extends IEntityProps> extends IEntity<UUID, P> {
  constructor(props: P, id?: UUID) {
    super(props, id)
  }
}
