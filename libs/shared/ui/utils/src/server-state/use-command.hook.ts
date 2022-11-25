/* eslint-disable @typescript-eslint/no-explicit-any */
import { Command } from '@obeya/shared/domain'
import { sendCommand } from '@obeya/shared/infra/http'
import { useMutation } from '@tanstack/react-query'

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
