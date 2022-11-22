import { Button, Title } from '@mantine/core'
import { ExampleButton } from '@obeya/shared/ui/design-system'
import { useQuery } from '@tanstack/react-query'

export function Index() {
  const { isLoading, data } = useQuery({
    queryKey: ['status'],
    queryFn: () =>
      fetch('http://localhost:3000/status').then(res => res.json()),
  })

  return isLoading ? (
    'loading...'
  ) : (
    <>
      <div id="welcome">
        <Title>
          <span> Hello, obeya! 👋</span>
        </Title>
        <p className="text-action-80 bg-bnw-90 font-bold">Hello, world!</p>
        <p>{JSON.stringify(data)}</p>
      </div>

      <ExampleButton color="action">Click me</ExampleButton>
      <Button>Hey</Button>
    </>
  )
}

export default Index
