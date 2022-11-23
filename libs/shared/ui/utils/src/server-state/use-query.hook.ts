import { Query } from '@obeya/shared/domain'
import { getQuery } from '@obeya/shared/infra/comms'
import { useQuery as useReactQuery } from '@tanstack/react-query'

export function useQuery<D, Q extends Query>(
  query: Q,
  options?: Omit<Parameters<typeof useReactQuery>, 'queryKey' | 'queryFn'>
) {
  return useReactQuery([query], {
    ...options,
    queryFn: () => getQuery<D, Q>(query),
  })
}
