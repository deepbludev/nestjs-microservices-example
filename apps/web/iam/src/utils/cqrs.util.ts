import { Command, Query } from '@obeya/shared/domain'
import { useQuery as useReactQuery } from '@tanstack/react-query'
import axios from 'axios'

export async function getQuery<D, Q extends Query>(query: Q) {
  const params = new URLSearchParams(JSON.stringify(query.payload))
  return axios.get<D>(`api/${query.path}`, { params }).then(res => res.data)
}

export function useQuery<D, Q extends Query>(
  query: Q,
  options?: Omit<Parameters<typeof useReactQuery>, 'queryKey' | 'queryFn'>
) {
  return useReactQuery([query], {
    ...options,
    queryFn: () => getQuery<D, Q>(query),
  })
}

export async function sendCommand<D, C extends Command>(command: C) {
  return axios
    .post<D>(`api/${command.path}`, command.payload)
    .then(res => res.data)
}

export function useCommand<D, C extends Command = Command>(
  command: C,
  options?: Omit<Parameters<typeof useReactQuery>, 'queryKey' | 'queryFn'>
) {
  return useReactQuery([command], {
    ...options,
    queryFn: () => sendCommand<D, C>(command),
  })
}
