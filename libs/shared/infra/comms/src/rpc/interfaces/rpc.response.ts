import { HttpStatus } from '@nestjs/common'
import { HttpResponse } from '@obeya/shared/infra/http'

export interface RpcResponse<D = void>
  extends Omit<HttpResponse<D>, 'statusCode'> {
  statusCode: HttpStatus
}
