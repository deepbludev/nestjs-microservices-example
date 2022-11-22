import { Title } from '@mantine/core'
import { ExampleButton } from '@obeya/shared/ui/design-system'

import { trpc } from '../infra/trpc/trpc.config'
const date = new Date()

export function Index() {
  const hello = trpc.status.useQuery({
    text: 'obeya! from react query',
    date,
  })
  if (!hello.data) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div id="welcome">
        <Title>
          <span> Hello there, </span>
          Welcome obeya 👋
        </Title>
        <p className="text-action-80 bg-bnw-90 font-bold">Hello, world!</p>
      </div>
      <p>{hello.data.greeting}</p>
      <p>{hello.data.date.toString()}</p>
      <ExampleButton color="action" size="xl">
        Click me
      </ExampleButton>
    </>
  )
}

export default Index
