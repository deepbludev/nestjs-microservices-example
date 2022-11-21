import { Title } from '@mantine/core'
import { ExampleButton } from '@obeya/shared/ui/design-system'

export function Index() {
  return (
    <>
      <div id="welcome">
        <Title>
          <span> Hello there, </span>
          Welcome obeya 👋
        </Title>
        <p className="text-red-600 font-bold">Hello, world!</p>
      </div>
      <ExampleButton color="green" size="xl">
        Click me
      </ExampleButton>
    </>
  )
}

export default Index
