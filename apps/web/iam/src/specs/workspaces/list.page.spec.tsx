import { QueryClientProvider } from '@obeya/shared/ui/app-shell'
import { render } from '@testing-library/react'

import ListWorkspacesNextPage from '../../pages/workspaces'

describe(ListWorkspacesNextPage, () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <QueryClientProvider>
        <ListWorkspacesNextPage />
      </QueryClientProvider>
    )
    expect(baseElement).toBeTruthy()
  })
})
