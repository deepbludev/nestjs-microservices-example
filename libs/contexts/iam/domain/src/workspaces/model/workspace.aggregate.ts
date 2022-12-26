import { AggregateRoot, WorkspaceId } from '@obeya/shared/domain'

import { WorkspaceCreated } from '../events/workspace.created.event'
import { CreateWorkspaceDTO, WorkspaceDTO } from './workspace.dto'
import { WorkspaceName } from './workspace.name.vo'
import { WorkspaceSlug } from './workspace.slug.vo'

export interface WorkspaceProps {
  name: WorkspaceName
  slug: WorkspaceSlug
}

export class Workspace extends AggregateRoot<
  WorkspaceDTO,
  WorkspaceId,
  WorkspaceProps
> {
  static createProps(dto: CreateWorkspaceDTO) {
    const { id, name, slug } = dto
    const results = [
      WorkspaceId.from<WorkspaceId>(id),
      WorkspaceName.create(name),
      WorkspaceSlug.create(slug),
    ] as const

    return results
  }

  get name() {
    return this.props.name
  }

  get slug() {
    return this.props.slug
  }

  get dto(): WorkspaceDTO {
    return {
      id: this.id.value,
      name: this.name.value,
      slug: this.slug.value,
      version: this.version,
    }
  }

  static from(dto: WorkspaceDTO): Workspace {
    const [id, name, slug] = Workspace.createProps(dto)
    const workspace = Workspace.createEmpty<Workspace>()
    workspace.id = id.data
    workspace._version = dto.version
    workspace.props.name = name.data
    workspace.props.slug = slug.data

    return workspace
  }

  protected onWorkspaceCreated(event: WorkspaceCreated) {
    const [id, name, slug] = Workspace.createProps({
      ...event.payload,
      id: event.aggregateId,
    })
    this.id = id.data
    this.props.name = name.data
    this.props.slug = slug.data
  }
}
