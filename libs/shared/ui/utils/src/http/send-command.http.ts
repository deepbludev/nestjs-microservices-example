import { Command } from '@obeya/shared/domain'
import axios, { AxiosResponse } from 'axios'

// eslint-disable-next-line @typescript-eslint/ban-types
export async function sendCommand<C extends Command, D = {}>(command: C) {
  return axios
    .post<AxiosResponse<D>>(
      `http://localhost:3000${command.path}`,
      command.payload
    )
    .then(res => res.data.data)
}
