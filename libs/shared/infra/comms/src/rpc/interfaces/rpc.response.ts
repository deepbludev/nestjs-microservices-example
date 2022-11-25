import { HttpStatus } from '@nestjs/common'
import { HttpResponse } from '@obeya/shared/ui/utils'

export interface RpcResponse<D = void> extends HttpResponse<D> {
  statusCode: HttpStatus
}
