import { Slug } from '@obeya/shared/domain'
import { Button } from '@obeya/shared/ui/design-system'

import { CreateWorkspaceUseCase } from '../../usecases/create/create.workspace.usecase'

export interface ListWorkspacesPageProps {
  createWorkspaceUseCase: CreateWorkspaceUseCase
}

const workspace = (id?: string) => {
  const name = `Workspace ${Date.now()}`
  return { id, name, slug: Slug.toSlug(name) }
}

export function ListWorkspacesPage({
  createWorkspaceUseCase,
}: ListWorkspacesPageProps) {
  const {
    isLoading,
    isError,
    error: { status, error },
    dispatch,
    id,
  } = createWorkspaceUseCase(workspace())

  return (
    <>
      <p>Workspaces</p>
      <div>
        {isLoading ? <div>loading...</div> : <p>{id && `Workspace: ${id}`}</p>}
      </div>
      <Button onClick={dispatch}>Create random workspace</Button>
      {isError && <div>{`Error ${status}: ${error}`}</div>}
    </>
  )
}
