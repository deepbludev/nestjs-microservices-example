import { Query } from '@obeya/shared/domain'
import { apiClient, HttpResponse } from '@obeya/shared/infra/http'
import { useQuery as useReactQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export function useQuery<T, Q extends Query>(
  query: Q,
  opts?: {
    options?: Omit<Parameters<typeof useReactQuery>, 'queryKey' | 'queryFn'>
    config?: Parameters<typeof apiClient.get>[1]
  }
) {
  const {
    data: result,
    error: queryError,
    ...rest
  } = useReactQuery<HttpResponse<T>, AxiosError<HttpResponse<T>>>(
    [query.path, query.payload],
    {
      queryFn: () => apiClient.get<Q, T>(query),
      ...opts?.options,
    }
  )
  return {
    result,
    error: {
      instance: queryError,
      error: queryError?.response?.data?.message,
      status: queryError?.response?.status,
    },
    ...rest,
  }
}
