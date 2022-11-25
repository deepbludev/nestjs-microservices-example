/* eslint-disable @typescript-eslint/no-explicit-any */
import { Query } from '@obeya/shared/domain'
import axios, { AxiosRequestConfig } from 'axios'

import { HttpResponse } from '../protocols/http.response'

export async function getQuery<Q extends Query = Query, T = any>(
  query: Q,
  config?: AxiosRequestConfig
): Promise<HttpResponse<T>> {
  return axios
    .get<HttpResponse<T>>(`http://localhost:3000/${query.path}`, {
      ...config,
      params: new URLSearchParams(JSON.stringify(query.payload)),
    })
    .then(res => res.data)
}
