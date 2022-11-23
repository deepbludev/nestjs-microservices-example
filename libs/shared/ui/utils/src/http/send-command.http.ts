import { Command } from '@obeya/shared/domain'
import axios from 'axios'

export async function sendCommand<D, C extends Command>(command: C) {
  return axios
    .post<D>(`api/${command.path}`, command.payload)
    .then(res => res.data)
}
