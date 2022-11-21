import { render } from '@testing-library/react'

import { ExampleButton } from './example.button'

describe(ExampleButton, () => {
  const text = 'Hello, obeya!'
  const {
    container: { firstChild: button },
  } = render(<ExampleButton color="green">{text}</ExampleButton>)

  const {
    container: { firstChild: buttonWithDefaultColor },
  } = render(<ExampleButton>{text}</ExampleButton>)

  it('contains correct color classes', () => {
    expect(button).toHaveClass('bg-green-900 hover:bg-green-400')
  })

  it('renders with default color when no color is provided', () => {
    expect(buttonWithDefaultColor).toHaveClass(
      'bg-primary-900 hover:bg-primary-400'
    )
  })

  it('contains correct text', () => {
    expect(button).toHaveTextContent('Hello, obeya!')
    expect(buttonWithDefaultColor).toHaveTextContent('Hello, obeya!')
  })
})
