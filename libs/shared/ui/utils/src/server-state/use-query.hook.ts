import { Query } from '@obeya/shared/domain'
import { useQuery as useReactQuery } from '@tanstack/react-query'

import { getQuery } from '../http/get-query.http'

export function useQuery<D, Q extends Query>(
  query: Q,
  options?: Omit<Parameters<typeof useReactQuery>, 'queryKey' | 'queryFn'>
) {
  return useReactQuery([query], {
    ...options,
    queryFn: () => getQuery<D, Q>(query),
  })
}
