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

export function Index() {
  const { isLoading, isError, error, data } = useQuery(['status'], {
    queryFn: () =>
      axios.get<{ message: string }>('api/status').then(res => res.data),
  })

  if (isLoading) return 'loading...'
  if (isError) return `error: ${error}`

  return (
    <>
      <div id="welcome">
        <Title>
          <span> Hello, obeya! 👋</span>
        </Title>
        <p className="text-action-80 bg-bnw-90 font-bold">Hello, world!</p>
        <p>{data?.message}</p>
      </div>

      <ExampleButton color="action">Click me</ExampleButton>
      <Button>Hey</Button>
    </>
  )
}

export default Index
