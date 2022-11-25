import { render } from '@testing-library/react'

import { Button } from './button'

describe(Button, () => {
  const text = 'Hello, obeya!'
  const {
    container: { firstChild: button },
  } = render(<Button color="light">{text}</Button>)

  const {
    container: { firstChild: buttonWithDefaultColor },
  } = render(<Button>{text}</Button>)

  it('contains correct color classes', () => {
    expect(button).toHaveClass('bg-light-100 hover:bg-light-80 text-bnw-60')
  })

  it('renders with default color when no color is provided', () => {
    expect(buttonWithDefaultColor).toHaveClass(
      'bg-primary-100 hover:bg-primary-80 text-white'
    )
  })

  it('contains correct text', () => {
    expect(button).toHaveTextContent('Hello, obeya!')
    expect(buttonWithDefaultColor).toHaveTextContent('Hello, obeya!')
  })
})
