/* eslint-disable @typescript-eslint/no-explicit-any */
import { Command } from '@obeya/shared/domain'
import { HttpResponse, sendCommand } from '@obeya/shared/infra/http'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export function useCommand<T, C extends Command = Command>(
  command: C,
  opts?: {
    options?: Omit<Parameters<typeof useMutation>, 'mutationKey' | 'mutationFn'>
    config?: Parameters<typeof sendCommand>[1]
  }
) {
  const { data: result, ...rest } = useMutation<
    HttpResponse<T>,
    AxiosError<HttpResponse<T>>
  >([command.path, command.payload], {
    mutationFn: () => sendCommand<C, T>(command, opts?.config),
    ...opts?.options,
  })

  return { result, ...rest }
}
