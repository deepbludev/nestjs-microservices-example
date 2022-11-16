import { Inject, Injectable } from '@nestjs/common'
import { MongoClient } from 'mongodb'

@Injectable()
export class MongoDbService {
  constructor(@Inject('MONGODB_CLIENT') readonly client: MongoClient) {}

  db(name?: string) {
    return this.client.db(name)
  }

  collection<T>(name: string, dbName?: string) {
    return this.db(dbName).collection<T>(name)
  }
}
