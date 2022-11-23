import { Command } from '@obeya/shared/domain'
import { sendCommand } from '@obeya/shared/infra/comms'
import { useQuery as useReactQuery } from '@tanstack/react-query'

export function useCommand<D, C extends Command = Command>(
  command: C,
  options?: Omit<Parameters<typeof useReactQuery>, 'queryKey' | 'queryFn'>
) {
  return useReactQuery([command], {
    ...options,
    queryFn: () => sendCommand<D, C>(command),
  })
}
