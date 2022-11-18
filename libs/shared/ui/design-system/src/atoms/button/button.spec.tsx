import { render, screen } from '@testing-library/react'

import Button from './button'

describe('Button', () => {
  it('should render successfully', () => {
    const text = 'Hello, obeya!'
    const { baseElement } = render(<Button text={text} />)
    expect(baseElement).toBeTruthy()
    expect(screen.getByText(text)).toBeTruthy()
  })
})
