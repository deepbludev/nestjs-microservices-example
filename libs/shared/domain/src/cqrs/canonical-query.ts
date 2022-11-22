import { IPayload, Query as BaseQuery, textUtils } from '@deepblu/ddd'

export type CanonicalQuery = `query:${string}`
export class Query<P extends IPayload = IPayload> extends BaseQuery<P> {
  static readonly canonical: CanonicalQuery = `query:${textUtils.camelToSnake(
    this.name
  )}`

  get canonical(): string {
    return (this.constructor as typeof Query).canonical
  }
}
