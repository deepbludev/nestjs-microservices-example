import { Query } from '@obeya/shared/domain'
import { useQuery as useReactQuery } from '@tanstack/react-query'

import { getQuery } from '../http/get-query.http'

export function useQuery<T, Q extends Query>(
  query: Q,
  opts?: {
    options?: Omit<Parameters<typeof useReactQuery>, 'queryKey' | 'queryFn'>
    config?: Parameters<typeof getQuery>[1]
  }
) {
  return useReactQuery([query.path, query.payload], {
    queryFn: () => getQuery<Q, T>(query),
    ...opts?.options,
  })
}
