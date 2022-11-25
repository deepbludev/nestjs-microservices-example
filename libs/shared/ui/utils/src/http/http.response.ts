import { HttpStatusCode } from '@obeya/shared/infra/http'

export interface HttpResponse<D = void> {
  message: string
  data: D | null
  statusCode: HttpStatusCode
}
