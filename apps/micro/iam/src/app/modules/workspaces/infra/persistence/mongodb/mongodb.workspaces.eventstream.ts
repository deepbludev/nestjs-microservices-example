import { Injectable } from '@nestjs/common'
import {
  Workspace,
  WorkspaceDTO,
  WorkspacesEventStream,
} from '@obeya/contexts/iam/domain'
import {
  MongoDbEventStream,
  MongoDbService,
} from '@obeya/shared/infra/persistence'

@Injectable()
export class MongoDbWorkspacesEventStream
  extends MongoDbEventStream<Workspace, WorkspaceDTO>
  implements WorkspacesEventStream
{
  aggregate = Workspace.name
  mapper = Workspace.from

  constructor(protected readonly client: MongoDbService) {
    super(client)
  }
}
