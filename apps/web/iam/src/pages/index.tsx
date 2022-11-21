import { ExampleButton } from '@obeya/shared/ui/design-system'

export function Index() {
  return (
    <>
      <div id="welcome">
        <h1>
          <span> Hello there, </span>
          Welcome obeya 👋
        </h1>
        <p className="text-red-600 font-bold">Hello, world!</p>
      </div>
      <ExampleButton color="green" size="xl">
        Click me
      </ExampleButton>
    </>
  )
}

export default Index
