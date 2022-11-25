import { IEventPublisherRepo } from '@deepblu/ddd'
import { Injectable } from '@nestjs/common'
import { Nullable } from '@obeya/shared/domain'

import { Workspace } from '../model/workspace.aggregate'

@Injectable()
export abstract class WorkspacesRepo extends IEventPublisherRepo<Workspace> {
  abstract findBySlug(email: string): Promise<Nullable<Workspace>>
}
