/* eslint-disable @typescript-eslint/no-explicit-any */
import { Payload } from '@obeya/shared/core'
import { Command } from '@obeya/shared/domain'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { HttpResponse } from '../protocols/http.response'

export async function sendCommand<C extends Command, T = any>(
  command: C,
  config?: AxiosRequestConfig
): Promise<HttpResponse<T>> {
  const response = await axios
    .post<HttpResponse<T>, AxiosResponse<HttpResponse<T>>, Payload<C>>(
      `http://localhost:3000${command.path}`,
      command.payload,
      config
    )
    .then(res => res.data)

  return response
}
