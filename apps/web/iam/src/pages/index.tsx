import { Title } from '@mantine/core'
import { ExampleButton } from '@obeya/shared/ui/design-system'

import { trpc } from '../utils/trpc'

export function Index() {
  const hello = trpc.status.useQuery({
    text: 'obeya! from react query',
    date: new Date(),
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
        <p className="text-red-600 font-bold">Hello, world!</p>
      </div>
      <p>{hello.data.greeting}</p>
      <p>{hello.data.date.toString()}</p>
      <ExampleButton color="primary" size="xl">
        Click me
      </ExampleButton>
    </>
  )
}

export default Index
