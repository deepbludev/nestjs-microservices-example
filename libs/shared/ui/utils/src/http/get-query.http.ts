import { Query } from '@obeya/shared/domain'
import axios, { AxiosResponse } from 'axios'

export async function getQuery<D, Q extends Query = Query>(query: Q) {
  const params = new URLSearchParams(JSON.stringify(query.payload))
  return axios
    .get<AxiosResponse<D>>(`http://localhost:3000/${query.path}`, { params })
    .then(res => res.data.data)
}
