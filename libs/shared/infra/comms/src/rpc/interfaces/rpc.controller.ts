/* eslint-disable @typescript-eslint/ban-types */
import { HttpException } from '@nestjs/common'

import { RpcResponse } from './rpc.response'

export interface RpcController<
  R = {},
  D = void,
  E extends HttpException = HttpException
> {
  run(dto: R): Promise<RpcResponse<D> | E>
}
