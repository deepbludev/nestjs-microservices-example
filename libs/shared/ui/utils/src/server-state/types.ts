/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPayload } from '@obeya/shared/core'
import { HttpResponse } from '@obeya/shared/infra/http'
import { AxiosError } from 'axios'

export type CqrsError<T> = {
  instance: AxiosError<HttpResponse<T>, any> | null
  error: string | undefined
  status: number | undefined
}

export type CqrsKey = readonly [string, IPayload]

export type CqrsResult<T> = HttpResponse<T> | undefined
