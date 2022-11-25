import { Query } from '@obeya/shared/domain'
import { getQuery } from '@obeya/shared/infra/http'
import { useQuery as useReactQuery } from '@tanstack/react-query'

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
