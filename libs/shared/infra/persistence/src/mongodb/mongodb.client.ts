import { Injectable } from '@nestjs/common'
import { MongoClient } from 'mongodb'

@Injectable()
export class MongoDbClient extends MongoClient {}
