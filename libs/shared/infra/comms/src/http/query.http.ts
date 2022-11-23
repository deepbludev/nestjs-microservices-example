import { Query } from '@obeya/shared/domain'
import axios from 'axios'

export async function getQuery<D, Q extends Query>(query: Q) {
  const params = new URLSearchParams(JSON.stringify(query.payload))
  return axios.get<D>(`api/${query.path}`, { params }).then(res => res.data)
}
