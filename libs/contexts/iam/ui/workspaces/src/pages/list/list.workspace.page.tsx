import { Slug } from '@obeya/shared/core'
import { Button } from '@obeya/shared/ui/design-system'

import { CreateWorkspaceUseCase } from '../../usecases/create/create.workspace.usecase'

export interface ListWorkspacesPageProps {
  createWorkspaceUseCase: CreateWorkspaceUseCase
}

const createWorkspace = (id?: string) => {
  const name = `Workspace ${Date.now()}`
  return { id, name, slug: Slug.toSlug(name) }
}

export function ListWorkspacesPage({
  createWorkspaceUseCase,
}: ListWorkspacesPageProps) {
  const workspace = createWorkspace()

  const {
    isLoading: isCreateWorkspaceLoading,
    isError: isCreateWorkspaceError,
    error: createWorkspaceError,
    dispatch: dispatchCreateWorkspace,
    id: workspaceId,
  } = createWorkspaceUseCase(workspace)

  return (
    <>
      <p>Workspaces</p>
      <div>
        {isCreateWorkspaceLoading ? (
          <div>loading...</div>
        ) : (
          <p>{workspaceId && `Workspace: ${workspaceId}`}</p>
        )}
      </div>
      <Button onClick={dispatchCreateWorkspace}>Create random workspace</Button>
      {isCreateWorkspaceError && (
        <div>{`Error ${createWorkspaceError.status}: ${createWorkspaceError.error}`}</div>
      )}
    </>
  )
}
