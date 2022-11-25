import { useRouter } from 'next/router'

/* eslint-disable-next-line */
export interface WorkspaceDetailPageProps {}

export function WorkspaceDetailPage(props: WorkspaceDetailPageProps) {
  const {
    query: { slug },
  } = useRouter()

  return <div>Hello, World! from WorkspaceDetail {slug} view</div>
}

export default WorkspaceDetailPage
