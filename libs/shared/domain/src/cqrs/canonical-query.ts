import { IPayload, Query as BaseQuery, textUtils } from '@deepblu/ddd'

export type CanonicalQuery = `query:${string}`

export class Query<P extends IPayload = IPayload> extends BaseQuery<P> {
  static readonly canonical: CanonicalQuery = `query:${textUtils
    .camelToSnake(this.name)
    .replace('_', '-')}`

  static path(): string {
    return `/${this.canonical.split(':')[1].replaceAll('.', '/')}`
  }

  get canonical(): string {
    return (this.constructor as typeof Query).canonical
  }

  get path(): string {
    return (this.constructor as typeof Query).path()
  }
}
