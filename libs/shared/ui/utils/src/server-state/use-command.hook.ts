/* eslint-disable @typescript-eslint/no-explicit-any */
import { Command } from '@obeya/shared/domain'
import { apiClient, HttpResponse } from '@obeya/shared/infra/http'
import { UseMutateFunction, useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { CqrsError, CqrsKey, CqrsResult } from './types'

export interface UseCommandOptions {
  options?: Omit<Parameters<typeof useMutation>, 'mutationKey' | 'mutationFn'>
  config?: Parameters<typeof apiClient.dispatch>[1]
}

export interface UseCommandResponse<T>
  extends Omit<
    ReturnType<
      typeof useMutation<HttpResponse<T>, AxiosError<HttpResponse<T>>>
    >,
    'data' | 'error' | 'mutate'
  > {
  result: CqrsResult<T>
  commandKey: CqrsKey
  error: CqrsError<T>
  dispatch: UseMutateFunction<
    HttpResponse<T>,
    AxiosError<HttpResponse<T>, any>,
    void,
    unknown
  >
}

export function useCommand<T, C extends Command = Command>(
  command: C,
  opts?: UseCommandOptions
): UseCommandResponse<T> {
  const commandKey = [command.path, command.payload] as const

  const {
    data: result,
    error: mutationError,
    mutate,
    ...rest
  } = useMutation<HttpResponse<T>, AxiosError<HttpResponse<T>>>(commandKey, {
    mutationFn: () => apiClient.dispatch<C, T>(command, opts?.config),
    ...opts?.options,
  })

  return {
    ...rest,
    result,
    commandKey,
    dispatch: mutate,
    error: {
      instance: mutationError,
      error: mutationError?.response?.data?.message,
      status: mutationError?.response?.status,
    },
  }
}
