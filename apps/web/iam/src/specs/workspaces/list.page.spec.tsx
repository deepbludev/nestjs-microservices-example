import { render } from '@testing-library/react'

import ListWorkspacesNextPage from '../../pages/workspaces'

describe(ListWorkspacesNextPage, () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ListWorkspacesNextPage />)
    expect(baseElement).toBeTruthy()
  })
})
