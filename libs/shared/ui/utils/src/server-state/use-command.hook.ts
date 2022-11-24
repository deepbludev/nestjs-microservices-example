/* eslint-disable @typescript-eslint/no-explicit-any */
import { Command } from '@obeya/shared/domain'
import { useMutation } from '@tanstack/react-query'

import { sendCommand } from '../http/send-command.http'

export function useCommand<T, C extends Command = Command>(
  command: C,
  opts?: {
    options?: Omit<Parameters<typeof useMutation>, 'mutationKey' | 'mutationFn'>
    config?: Parameters<typeof sendCommand>[1]
  }
) {
  return useMutation([command.path, command.payload], {
    mutationFn: () => sendCommand<C, T>(command, opts?.config),
    ...opts?.options,
  })
}
