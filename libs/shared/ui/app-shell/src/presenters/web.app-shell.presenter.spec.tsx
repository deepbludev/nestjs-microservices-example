import { render } from '@testing-library/react'

import { WebAppShell } from './web.app-shell.presenter'

describe(WebAppShell, () => {
  it('should render successfully', () => {
    const text = 'Hello, obeya!'
    const {
      container: { firstChild: appShell },
    } = render(
      <WebAppShell>
        <p>{text}</p>
      </WebAppShell>
    )
    expect(appShell).toBeTruthy()
    expect(appShell).toHaveTextContent('Hello, obeya!')
  })
})
