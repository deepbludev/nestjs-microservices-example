import { render } from '@testing-library/react'

import { ExampleButton } from './example.button'

describe(ExampleButton, () => {
  const text = 'Hello, obeya!'
  const {
    container: { firstChild: button },
  } = render(<ExampleButton color="action">{text}</ExampleButton>)

  const {
    container: { firstChild: buttonWithDefaultColor },
  } = render(<ExampleButton>{text}</ExampleButton>)

  it('contains correct color classes', () => {
    expect(button).toHaveClass('bg-action-100 hover:bg-action-80')
  })

  it('renders with default color when no color is provided', () => {
    expect(buttonWithDefaultColor).toHaveClass(
      'bg-primary-100 hover:bg-primary-80'
    )
  })

  it('contains correct text', () => {
    expect(button).toHaveTextContent('Hello, obeya!')
    expect(buttonWithDefaultColor).toHaveTextContent('Hello, obeya!')
  })
})
