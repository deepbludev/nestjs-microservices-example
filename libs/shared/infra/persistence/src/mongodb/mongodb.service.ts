import { Injectable } from '@nestjs/common'

import { MongoDbClient } from './mongodb.client'

@Injectable()
export class MongoDbService {
  constructor(readonly client: MongoDbClient) {}

  db(name?: string) {
    return this.client.db(name)
  }

  collection<T>(name: string, dbName?: string) {
    return this.db(dbName).collection<T>(name)
  }
}

export type MongoDoc<DTO> = DTO & { _id: string }
