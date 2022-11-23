/* eslint-disable @typescript-eslint/no-explicit-any */
import { Command } from '@obeya/shared/domain'
import axios from 'axios'

export async function sendCommand<C extends Command, D = any>(command: C) {
  return axios
    .post<D>(`api/${command.path}`, command.payload)
    .then(res => res.data)
}
