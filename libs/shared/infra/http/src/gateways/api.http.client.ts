/* eslint-disable @typescript-eslint/no-explicit-any */
import { Payload } from '@obeya/shared/core'
import { Command, Query } from '@obeya/shared/domain'

import { HttpResponse } from '../protocols/http.response'
import { AxiosHttpClient, HttpClientConfig } from './http.client'

export class ApiClient {
  readonly http: AxiosHttpClient

  constructor(baseURL: string) {
    this.http = new AxiosHttpClient({
      baseURL,
      // withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async dispatch<C extends Command, T = any>(
    command: C,
    config?: HttpClientConfig
  ): Promise<HttpResponse<T>> {
    return this.http.post<T, Payload<C>>(command.path, command.payload, config)
  }

  async get<Q extends Query = Query, T = any>(
    query: Q,
    config?: HttpClientConfig
  ): Promise<HttpResponse<T>> {
    return this.http.get<T>(query.path, {
      ...config,
      params: new URLSearchParams(JSON.stringify(query.payload)),
    })
  }
}

export const apiClient = new ApiClient(
  process.env['API_BASE_URL'] ?? 'http://localhost:3000'
)
