import { render } from '@testing-library/react'

import { AppShell } from './shared-ui-app-shell'

describe(AppShell, () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppShell />)
    expect(baseElement).toBeTruthy()
  })
})
