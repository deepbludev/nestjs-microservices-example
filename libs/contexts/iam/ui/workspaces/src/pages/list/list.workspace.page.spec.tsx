import { render } from '@testing-library/react'

import { ListWorkspacesPage } from './list.workspace.page'

describe(ListWorkspacesPage, () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ListWorkspacesPage createWorkspaceUseCase={jest.fn()} />
    )
    expect(baseElement).toBeTruthy()
  })
})
