import { Title } from '@mantine/core'
import { SignupUser, SignupUserResponseDTO } from '@obeya/contexts/iam/domain'
import { uuid } from '@obeya/shared/core'
import { Button } from '@obeya/shared/ui/design-system'
import { useCommand } from '@obeya/shared/ui/utils'

const createUser = () => ({
  id: uuid.create(),
  email: `${Date.now()}@example.com`,
  password: 'valid_password',
})

const user = createUser()

export function Index() {
  const {
    isLoading,
    isError,
    error: { status, error },
    mutate,
    result,
  } = useCommand<SignupUserResponseDTO>(SignupUser.with(user))

  const { data, message, statusCode } = result || {}

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
            <p>
              {statusCode}:{message}
            </p>
          </>
        )}
      </div>
      <Button color="light">Click me</Button>
      <Button color="bnw" onClick={() => mutate()}>
        Create random user
      </Button>
      {isError && <div>{`Error ${status}: ${error}`}</div>}
    </>
  )
}

export default Index
