import { Button, Title } from '@mantine/core'
import {
  SignupUser,
  SignupUserResponseDTOSchema,
} from '@obeya/contexts/iam/domain'
import { ExampleButton } from '@obeya/shared/ui/design-system'
import { useCommand, useQuery } from '@obeya/shared/ui/utils'
import { useQuery as useReactQuery } from '@tanstack/react-query'
import axios from 'axios'

export type CommandEndpoint = {
  command: string
}

export type QueryEndpoint = {
  query: string
}

export function Index() {
  const { isLoading, isError, error, data } = useReactQuery(['status'], {
    queryFn: () =>
      axios.get<{ message: string }>('api/status').then(res => res.data),
  })

  const { data: result } = useCommand<SignupUser, SignupUserResponseDTOSchema>(
    SignupUser.with({
      id: 'id-1234',
      email: 'valid@email.com',
      password: 'valid_password',
    })
  )
  console.log(result?.id)

  console.log({ useCommand, useQuery })

  if (isLoading) return <div>loading...</div>
  if (isError) return <div>{`error: ${error}`}</div>

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
