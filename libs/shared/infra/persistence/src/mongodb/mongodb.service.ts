import { Inject, Injectable } from '@nestjs/common'
import { Db } from 'mongodb'

@Injectable()
export class MongoDbService {
  constructor(@Inject('DB_CONNECTION') readonly db: Db) {}
}
