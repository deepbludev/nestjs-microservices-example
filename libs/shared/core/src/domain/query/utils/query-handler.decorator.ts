import { Constructor } from '../../types'
import { IQuery } from '../query.abstract'
import { IQueryHandler } from '../query-handler.interface'

export const queryHandler = (query: Constructor<IQuery>) =>
  function <
    T extends Constructor<IQueryHandler> & {
      subscription: Constructor<IQuery>
    }
  >(QueryHandlerClass: T) {
    QueryHandlerClass.subscription = query
  }
