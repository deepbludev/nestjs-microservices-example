import { DomainEvent, domainEvent } from '@deepblu/ddd'

import { CreateWorkspaceRequestDTO } from '../commands/create/create.workspace.dto'

@domainEvent('Workspace')
export class WorkspaceCreated extends DomainEvent<
  Omit<CreateWorkspaceRequestDTO, 'id'>
> {}
