/* eslint-disable @typescript-eslint/no-explicit-any */
import { Payload } from '@obeya/shared/core'
import { Command, Query } from '@obeya/shared/domain'

import { HttpResponse } from '../protocols/http.response'
import { AxiosHttpClient, HttpClientConfig } from './http.client'

export class ApiClient {
  readonly http: AxiosHttpClient

  constructor(baseURL?: string) {
    this.http = new AxiosHttpClient({
      baseURL: baseURL ?? 'http://localhost:3000',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async dispatch<C extends Command, T = any>(
    command: C,
    config?: HttpClientConfig
  ): Promise<HttpResponse<T>> {
    const response = await this.http.post<T, Payload<C>>(
      command.path,
      command.payload,
      config
    )
    return response
  }

  async get<Q extends Query = Query, T = any>(
    query: Q,
    config?: HttpClientConfig
  ): Promise<HttpResponse<T>> {
    const params = new URLSearchParams(JSON.stringify(query.payload))
    const response = this.http.get<T>(query.path, { ...config, params })
    return response
  }
}

export const apiClient = new ApiClient(process.env['API_BASE_URL'])
