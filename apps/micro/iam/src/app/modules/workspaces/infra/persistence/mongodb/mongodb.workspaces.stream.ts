import { Injectable } from '@nestjs/common'
import {
  Workspace,
  WorkspaceDTO,
  WorkspacesEventStream,
} from '@obeya/contexts/iam/domain'
import { DomainEvent, IPayload } from '@obeya/shared/core'
import { WorkspaceId } from '@obeya/shared/domain'
import { MongoDbEventStream } from '@obeya/shared/infra/persistence'

@Injectable()
export class MongoDbWorkspacesEventStream
  extends MongoDbEventStream<Workspace, WorkspaceDTO>
  implements WorkspacesEventStream
{
  aggregate = Workspace.name
  mapper = Workspace.from
  protected aggregateClass = Workspace

  append(
    workspaceId: WorkspaceId,
    events: DomainEvent<IPayload>[],
    version: number
  ): Promise<void> {
    throw new Error('Method not implemented.' + workspaceId + events + version)
  }
  store(workspace: Workspace, changes: DomainEvent<IPayload>[]): Promise<void> {
    throw new Error('Method not implemented.' + workspace + changes)
  }
  get(workspaceId: WorkspaceId): Promise<DomainEvent<IPayload>[]> {
    throw new Error('Method not implemented.' + workspaceId)
  }
  version(workspaceId: WorkspaceId): Promise<number> {
    throw new Error('Method not implemented.' + workspaceId)
  }
}
