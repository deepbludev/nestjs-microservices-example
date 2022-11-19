import { HttpStatus } from '@nestjs/common'

export interface RpcResponse<D = void> {
  message: string
  statusCode: HttpStatus
  data: D | null
}
