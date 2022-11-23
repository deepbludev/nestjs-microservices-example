/* eslint-disable @typescript-eslint/no-explicit-any */
import { Command } from '@obeya/shared/domain'
import { useQuery as useReactQuery } from '@tanstack/react-query'

import { sendCommand } from '../http/send-command.http'

export function useCommand<C extends Command = Command, D = any>(
  command: C,
  options?: Omit<Parameters<typeof useReactQuery>, 'queryKey' | 'queryFn'>
) {
  return useReactQuery([command], {
    ...options,
    queryFn: () => sendCommand<C, D>(command),
  })
}
