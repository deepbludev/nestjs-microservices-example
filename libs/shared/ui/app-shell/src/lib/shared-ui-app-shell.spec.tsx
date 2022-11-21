import { render } from '@testing-library/react'

import SharedUiAppShell from './shared-ui-app-shell'

describe('SharedUiAppShell', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedUiAppShell />)
    expect(baseElement).toBeTruthy()
  })
})
