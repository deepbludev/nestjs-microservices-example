/* eslint-disable @typescript-eslint/no-explicit-any */
import { Query } from '@obeya/shared/domain'
import { RpcResponse } from '@obeya/shared/infra/comms'
import axios, { AxiosRequestConfig } from 'axios'

export async function getQuery<Q extends Query = Query, T = any>(
  query: Q,
  config?: AxiosRequestConfig
): Promise<RpcResponse<T>> {
  return axios
    .get<RpcResponse<T>>(`http://localhost:3000/${query.path}`, {
      ...config,
      params: new URLSearchParams(JSON.stringify(query.payload)),
    })
    .then(res => res.data)
}
