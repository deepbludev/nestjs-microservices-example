import { AggregateDTO } from '@obeya/shared/domain'

export interface WorkspaceDTO extends AggregateDTO {
  name: string
  slug: string
}
