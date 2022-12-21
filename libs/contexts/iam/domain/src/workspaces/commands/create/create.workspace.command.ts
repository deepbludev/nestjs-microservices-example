import { canonical, Command } from '@obeya/shared/domain'

import { CreateWorkspaceRequestDTO } from './create.workspace.dto'

@canonical('cmd:iam.workspaces.create')
export class CreateWorkspace extends Command<CreateWorkspaceRequestDTO> {}
