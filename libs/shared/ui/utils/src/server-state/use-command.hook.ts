/* eslint-disable @typescript-eslint/no-explicit-any */
import { Command } from '@obeya/shared/domain'
import { apiClient, HttpResponse } from '@obeya/shared/infra/http'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export function useCommand<T, C extends Command = Command>(
  command: C,
  opts?: {
    options?: Omit<Parameters<typeof useMutation>, 'mutationKey' | 'mutationFn'>
    config?: Parameters<typeof apiClient.dispatch>[1]
  }
) {
  const {
    data: result,
    error: mutationError,
    ...rest
  } = useMutation<HttpResponse<T>, AxiosError<HttpResponse<T>>>(
    [command.path, command.payload],
    {
      mutationFn: () => apiClient.dispatch<C, T>(command, opts?.config),
      ...opts?.options,
    }
  )

  return {
    result,
    error: {
      instance: mutationError,
      error: mutationError?.response?.data?.message,
      status: mutationError?.response?.status,
    },
    ...rest,
  }
}
