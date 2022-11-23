import { Command } from '@obeya/shared/domain'
import { useQuery as useReactQuery } from '@tanstack/react-query'

import { sendCommand } from '../http/send-command.http'

export function useCommand<D, C extends Command = Command>(
  command: C,
  options?: Omit<Parameters<typeof useReactQuery>, 'queryKey' | 'queryFn'>
) {
  return useReactQuery([command], {
    ...options,
    queryFn: () => sendCommand<D, C>(command),
  })
}
