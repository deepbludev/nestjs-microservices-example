import { Button, Title } from '@mantine/core'
import { ExampleButton } from '@obeya/shared/ui/design-system'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export type CommandEndpoint = {
  command: string
}

export type QueryEndpoint = {
  query: string
}

export const API = {
  status: { query: 'api/status' },
  iam: {
    users: {
      signup: { command: 'api/iam/users/signup' },
      login: { command: 'api/iam/users/login' },
    },
  },
} as const

export function query<T>(endpoint: QueryEndpoint) {
  return () => axios.get<T>(endpoint.query).then(res => res.data)
}

export function command<T>(endpoint: CommandEndpoint) {
  return () => axios.post<T>(endpoint.command).then(res => res.data)
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
