import { Title } from '@mantine/core'
import { ExampleButton } from '@obeya/shared/ui/design-system'

import { trpc } from '../utils/trpc'

export function Index() {
  const hello = trpc.hello.useQuery({ text: 'obeya, from trpc' })
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
      <ExampleButton color="primary" size="xl">
        Click me
      </ExampleButton>
    </>
  )
}

export default Index
