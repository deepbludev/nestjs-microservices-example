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
    expect(button).toHaveClass('bg-green-600 hover:bg-green-500')
  })

  it('renders with default color when no color is provided', () => {
    expect(buttonWithDefaultColor).toHaveClass(
      'bg-primary-600 hover:bg-primary-500'
    )
  })

  it('contains correct text', () => {
    expect(button).toHaveTextContent('Hello, obeya!')
    expect(buttonWithDefaultColor).toHaveTextContent('Hello, obeya!')
  })
})
