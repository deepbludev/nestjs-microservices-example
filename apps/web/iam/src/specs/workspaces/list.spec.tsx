import { render } from '@testing-library/react'

import ListWorkspacesPage from '../../pages/workspaces'

describe(ListWorkspacesPage, () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ListWorkspacesPage />)
    expect(baseElement).toBeTruthy()
  })
})
