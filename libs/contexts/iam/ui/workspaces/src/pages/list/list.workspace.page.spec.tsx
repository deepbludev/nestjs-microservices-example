import { render } from '@testing-library/react'

import { CreateWorkspaceUseCase } from '../../usecases/create/create.workspace.usecase'
import { ListWorkspacesPage } from './list.workspace.page'

describe('ListWorkspacesPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ListWorkspacesPage
        createWorkspaceUseCase={
          jest.fn(() => ({
            isLoading: true,
            isError: false,
            error: { status: 200, error: 'error' },
            dispatch: () => null,
            id: 'id',
          })) as unknown as CreateWorkspaceUseCase
        }
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
