import { Inject, Injectable } from '@nestjs/common'
import { MongoClient } from 'mongodb'

@Injectable()
export class MongoDbService {
  constructor(@Inject('MONGODB_CLIENT') readonly client: MongoClient) {
    console.log(this.client)
  }
}
