import { render, screen } from '@testing-library/react'

import WorkspaceDetailNextPage from '../../pages/workspaces/[slug]'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/workspace',
      pathname: '',
      query: { slug: 'test' },
      asPath: '',
    }
  },
}))

describe(WorkspaceDetailNextPage, () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WorkspaceDetailNextPage />)
    expect(baseElement).toBeTruthy()
    expect(screen.getByText(/test/)).toBeTruthy()
  })
})
