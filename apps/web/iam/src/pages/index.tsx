import { Button, Title } from '@mantine/core'
import { ExampleButton } from '@obeya/shared/ui/design-system'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export type CommandEndpoint = {
  verb: 'post'
  path: string
}

export type QueryEndpoint = {
  verb: 'get'
  path: string
}

export const API = {
  status: { verb: 'get', path: 'api/status' },
  iam: {
    users: {
      signup: { verb: 'post', path: 'api/iam/users/signup' },
      login: { verb: 'post', path: 'api/iam/users/login' },
    },
  },
} as const

export function query<T>(endpoint: QueryEndpoint) {
  return () => axios.get<T>(endpoint.path).then(res => res.data)
}

export function command<T>(endpoint: QueryEndpoint) {
  return () => axios.post<T>(endpoint.path).then(res => res.data)
}

type Response = { message: string }

export function Index() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['status'],
    queryFn: query<Response>(API.status),
  })

  if (isLoading) return 'loading...'
  if (isError) return `error: ${error}`

  const { message } = data
  return (
    <>
      <div id="welcome">
        <Title>
          <span> Hello, obeya! 👋</span>
        </Title>
        <p className="text-action-80 bg-bnw-90 font-bold">Hello, world!</p>
        <p>{message}</p>
      </div>

      <ExampleButton color="action">Click me</ExampleButton>
      <Button>Hey</Button>
    </>
  )
}

export default Index
