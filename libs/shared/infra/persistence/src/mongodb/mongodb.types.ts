import { AggregateDTO } from '@obeya/shared/domain'
import { Document } from 'mongodb'

export type MongoDTO = AggregateDTO & Document
export type Filter<DTO extends MongoDTO> = Partial<DTO>
