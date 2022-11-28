import { Slug } from '@obeya/shared/domain'
import { Button } from '@obeya/shared/ui/design-system'

import { useCreateWorkspace } from '../../usecases/create/create.workspace.usecase'

/* eslint-disable-next-line */
export interface ListWorkspacesPageProps {}

const createWorkspace = (id?: string) => {
  const name = `Workspace ${Date.now()}`
  return { id, name, slug: Slug.toSlug(name) }
}

export function ListWorkspacesPage(props: ListWorkspacesPageProps) {
  const {
    isLoading,
    isError,
    error: { status, error },
    dispatch,
    result,
  } = useCreateWorkspace(createWorkspace())

  const { data, message, statusCode } = result || {}

  return (
    <>
      <p>Workspaces</p>
      <div>
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <>
            <p>{data?.id}</p>
            <p>
              {statusCode}:{message}
            </p>
          </>
        )}
      </div>
      <Button onClick={dispatch}>Create random workspace</Button>
      {isError && <div>{`Error ${status}: ${error}`}</div>}
    </>
  )
}
