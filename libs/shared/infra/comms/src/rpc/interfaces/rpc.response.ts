/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatus } from '@nestjs/common'

export interface RpcResponse<D = void> {
  message: string
  status: HttpStatus
  data: D | null
}
