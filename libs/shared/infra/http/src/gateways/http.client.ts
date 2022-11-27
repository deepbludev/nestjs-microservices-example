/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from 'axios'

import { HttpResponse } from '../protocols/http.response'

export type HttpClientConfig<D = any> = AxiosRequestConfig<D>
export type HttpClientResponse<T = any, D = any> = AxiosResponse<T, D>

export class AxiosHttpClient {
  private _client: AxiosInstance

  constructor(config: CreateAxiosDefaults) {
    this._client = axios.create(config)
  }

  async get<T = any, D = any>(
    url: string,
    config?: HttpClientConfig
  ): Promise<HttpResponse<T>> {
    return this._client
      .get<HttpResponse<T>, AxiosResponse<HttpResponse<T>>, D>(url, config)
      .then(res => res.data)
  }

  async post<T = any, D = any>(
    url: string,
    data?: D,
    config?: HttpClientConfig<D>
  ): Promise<HttpResponse<T>> {
    return this._client
      .post<HttpResponse<T>, AxiosResponse<HttpResponse<T>>, D>(
        url,
        data,
        config
      )
      .then(res => res.data)
  }

  async put<T = any, D = any>(
    url: string,
    data?: D,
    config?: HttpClientConfig<D>
  ): Promise<HttpResponse<T>> {
    return this._client
      .put<HttpResponse<T>, AxiosResponse<HttpResponse<T>>, D>(
        url,
        data,
        config
      )
      .then(res => res.data)
  }

  async delete<T = any, D = any>(
    url: string,
    config?: HttpClientConfig<D>
  ): Promise<HttpResponse<T>> {
    return this._client
      .delete<HttpResponse<T>, AxiosResponse<HttpResponse<T>>, D>(url, config)
      .then(res => res.data)
  }
}
