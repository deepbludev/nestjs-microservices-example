import { Query } from '@obeya/shared/domain'
import { apiClient, HttpResponse } from '@obeya/shared/infra/http'
import { useQuery as useTanstackQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { CqrsError, CqrsKey, CqrsResult } from './types'

export interface UseQueryOptions {
  options?: Omit<Parameters<typeof useTanstackQuery>, 'queryKey' | 'queryFn'>
  config?: Parameters<typeof apiClient.get>[1]
}

export interface UseQueryResponse<T>
  extends Omit<
    ReturnType<
      typeof useTanstackQuery<HttpResponse<T>, AxiosError<HttpResponse<T>>>
    >,
    'data' | 'error'
  > {
  result: CqrsResult<T>
  queryKey: CqrsKey
  error: CqrsError<T>
}

export function useQuery<T, Q extends Query>(
  query: Q,
  opts?: UseQueryOptions
): UseQueryResponse<T> {
  const queryKey = [query.path, query.payload] as const

  const {
    data: result,
    error: queryError,
    ...rest
  } = useTanstackQuery<HttpResponse<T>, AxiosError<HttpResponse<T>>>(queryKey, {
    queryFn: () => apiClient.get<Q, T>(query),
    ...opts?.options,
  })

  return {
    ...rest,
    result,
    queryKey,
    error: {
      instance: queryError,
      error: queryError?.response?.data?.message,
      status: queryError?.response?.status,
    },
  }
}
