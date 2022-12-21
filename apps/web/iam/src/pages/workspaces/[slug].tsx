import { WorkspaceDetailPage } from '@obeya/contexts/iam/ui/workspaces'
import { useRouter } from 'next/router'

/* eslint-disable-next-line */
export interface WorkspaceDetailPageProps {}

export default function WorkspaceDetailNextPage(
  props: WorkspaceDetailPageProps
) {
  const {
    query: { slug },
  } = useRouter()

  return <WorkspaceDetailPage slug={slug as string} {...props} />
}
