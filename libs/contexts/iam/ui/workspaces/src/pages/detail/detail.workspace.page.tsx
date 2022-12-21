export interface WorkspaceDetailPageProps {
  slug: string
}

export function WorkspaceDetailPage({ slug }: WorkspaceDetailPageProps) {
  return (
    <div>
      <h1>Welcome to WorkspacesDetailPage!</h1>
      <p>slug: {slug}</p>
    </div>
  )
}
