/* eslint-disable @typescript-eslint/no-explicit-any */
import { Payload } from '@deepblu/ddd'
import { Command } from '@obeya/shared/domain'
import { RpcResponse } from '@obeya/shared/infra/comms'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export async function sendCommand<C extends Command, T = any>(
  command: C,
  config?: Omit<AxiosRequestConfig, 'data'>
): Promise<RpcResponse<T>> {
  const response = await axios
    .post<RpcResponse<T>, AxiosResponse<RpcResponse<T>>, Payload<C>>(
      `http://localhost:3000${command.path}`,
      command.payload,
      config
    )
    .then(res => res.data)

  return response
}
