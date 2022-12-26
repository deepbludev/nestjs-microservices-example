import { DomainEvent, domainEvent } from '@obeya/shared/core'

import { CreateWorkspaceDTO } from '../model/workspace.dto'

@domainEvent('Workspace')
export class WorkspaceCreated extends DomainEvent<
  Omit<CreateWorkspaceDTO, 'id'>
> {}
