import { HttpResponse } from '@obeya/shared/infra/http'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RpcResponse<D = void> extends HttpResponse<D> {}
