import { DomainEvent, domainEvent } from '@obeya/shared/core'

import { CreateWorkspaceRequestDTO } from '../commands/create/create.workspace.dto'

@domainEvent('Workspace')
export class WorkspaceCreated extends DomainEvent<
  Omit<CreateWorkspaceRequestDTO, 'id'>
> {}
