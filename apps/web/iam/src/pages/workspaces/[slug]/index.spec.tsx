import { render } from '@testing-library/react'

import WorkspaceDetailPage from './index'

describe(WorkspaceDetailPage, () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WorkspaceDetailPage />)
    expect(baseElement).toBeTruthy()
  })
})
