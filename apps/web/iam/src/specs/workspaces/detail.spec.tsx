import { render, screen } from '@testing-library/react'

import WorkspaceDetailPage from '../../pages/workspaces/[slug]'

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

describe(WorkspaceDetailPage, () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WorkspaceDetailPage />)
    expect(baseElement).toBeTruthy()
    expect(
      screen.getByText('Hello, World! from WorkspaceDetail test view')
    ).toBeTruthy()
  })
})
