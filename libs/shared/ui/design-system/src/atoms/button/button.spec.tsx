import { render } from '@testing-library/react'

import Button from './button'

describe('Button', () => {
  it('should render successfully', () => {
    const {
      container: { firstChild: button },
    } = render(<Button color={'cyan'}>'Hello, obeya!'</Button>)

    expect(button).toBeTruthy()
    expect(button).toHaveClass('bg-cyan-500 hover:bg-cyan-700')
    expect(button).toHaveTextContent('Hello, obeya!')
  })
})
