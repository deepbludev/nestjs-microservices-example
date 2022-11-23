/* eslint-disable @typescript-eslint/no-explicit-any */
import { Command } from '@obeya/shared/domain'
import { useMutation } from '@tanstack/react-query'

import { sendCommand } from '../http/send-command.http'

export function useCommand<D, C extends Command = Command>(
  command: C,
  options?: Omit<Parameters<typeof useMutation>, 'mutationKey' | 'mutationFn'>
) {
  return useMutation([command.path, command.payload], {
    ...options,
    mutationFn: () => sendCommand<C, D>(command),
  })
}
