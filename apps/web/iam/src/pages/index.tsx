import { UUID } from '@deepblu/ddd'
import { Button, Title } from '@mantine/core'
import { SignupUser, SignupUserResponseDTO } from '@obeya/contexts/iam/domain'
import { ExampleButton } from '@obeya/shared/ui/design-system'
import { useCommand } from '@obeya/shared/ui/utils'

const createUser = () => ({
  id: UUID.create().value,
  email: `${Date.now()}@example.com`,
  password: 'valid_password',
})

export function Index() {
  const user = createUser()
  const response = useCommand<SignupUserResponseDTO>(SignupUser.with(user))

  const { isLoading, isError, error, mutate } = response
  const { data, message } = response.data || {}

  return (
    <>
      <div>
        <Title>
          <span> Hello, obeya! 👋</span>
        </Title>
        <p className="text-action-80 bg-bnw-90 font-bold">Hello, world!</p>
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <>
            <p>{data?.id}</p>
            <p>{message}</p>
          </>
        )}
      </div>

      <ExampleButton color="action">Click me</ExampleButton>
      <Button onClick={() => mutate()}>Create random user</Button>

      {isError && <div>{`error: ${error}`}</div>}
    </>
  )
}

export default Index
