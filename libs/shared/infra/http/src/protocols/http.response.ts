import { HttpStatusCode } from './status-code.http'

export interface HttpResponse<D = void> {
  message: string
  data: D | null
  statusCode: HttpStatusCode
}
