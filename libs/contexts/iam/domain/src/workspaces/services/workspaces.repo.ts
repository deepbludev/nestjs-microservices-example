import { Injectable } from '@nestjs/common'
import { IEventPublisherRepo } from '@obeya/shared/core'
import { Nullable } from '@obeya/shared/domain'

import { Workspace } from '../model/workspace.aggregate'

@Injectable()
export abstract class WorkspacesRepo extends IEventPublisherRepo<Workspace> {
  abstract findBySlug(email: string): Promise<Nullable<Workspace>>
}
