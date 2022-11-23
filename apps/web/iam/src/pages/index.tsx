import { UUID } from '@deepblu/ddd'
import { Button, Title } from '@mantine/core'
import { SignupUser, SignupUserResponseDTO } from '@obeya/contexts/iam/domain'
import { ExampleButton } from '@obeya/shared/ui/design-system'
import { useCommand } from '@obeya/shared/ui/utils'

export type CommandEndpoint = {
  command: string
}

export type QueryEndpoint = {
  query: string
}

const user = () => ({
  id: UUID.create().value,
  email: `${Date.now()}@example.com`,
  password: 'valid_password',
})

export function Index() {
  const { isLoading, isError, error, data, mutate } =
    useCommand<SignupUserResponseDTO>(SignupUser.with(user()))

  if (isLoading) return <div>loading...</div>
  if (isError) return <div>{`error: ${error}`}</div>

  return (
    <>
      <div>
        <Title>
          <span> Hello, obeya! 👋</span>
        </Title>

        <p className="text-action-80 bg-bnw-90 font-bold">Hello, world!</p>
        <p>{data?.id}</p>
      </div>

      <ExampleButton color="action">Click me</ExampleButton>
      <Button onClick={() => mutate()}>Hey</Button>
      {isLoading && <div>loading...</div>}
      {isError && <div>{`error: ${error}`}</div>}
    </>
  )
}

export default Index
