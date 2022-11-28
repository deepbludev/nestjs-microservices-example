import {
  ListWorkspacesPage,
  useCreateWorkspace,
} from '@obeya/contexts/iam/ui/workspaces'

/* eslint-disable-next-line */
export interface ListWorkspacesNextPageProps {}

export default function ListWorkspacesNextPage(
  props: ListWorkspacesNextPageProps
) {
  return (
    <ListWorkspacesPage
      {...props}
      createWorkspaceUseCase={useCreateWorkspace}
    />
  )
}
