import { render, screen } from '@testing-library/react'

import { WorkspaceDetailPage } from './detail.workspace.page'

describe(WorkspaceDetailPage, () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <WorkspaceDetailPage slug="test-workspace-slug" />
    )
    expect(baseElement).toBeTruthy()
    expect(screen.getByText('slug: test-workspace-slug')).toBeTruthy()
  })
})
