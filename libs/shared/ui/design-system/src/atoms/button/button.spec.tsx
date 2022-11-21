import { render } from '@testing-library/react'

import { Button } from './button'

describe('Button', () => {
  const text = 'Hello, obeya!'
  const {
    container: { firstChild: button },
  } = render(<Button color={'cyan'}>{text}</Button>)

  const {
    container: { firstChild: buttonWithDefaultColor },
  } = render(<Button>{text}</Button>)

  it('contains correct color classes', () => {
    expect(button).toHaveClass('bg-cyan-500 hover:bg-cyan-700')
  })

  it('renders with default color when no color is provided', () => {
    expect(buttonWithDefaultColor).toHaveClass('bg-blue-500 hover:bg-blue-700')
  })

  it('contains correct text', () => {
    expect(button).toHaveTextContent('Hello, obeya!')
    expect(buttonWithDefaultColor).toHaveTextContent('Hello, obeya!')
  })
})
