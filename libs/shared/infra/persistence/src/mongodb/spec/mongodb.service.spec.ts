import { Test } from '@nestjs/testing'
import { Db, MongoClient } from 'mongodb'

import { MongoDbModule } from '../mongodb.module'
import { MongoDbService } from '../mongodb.service'

describe(MongoDbService, () => {
  let service: MongoDbService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MongoDbModule.forRoot({
          uri: 'mongodb://localhost:37017/test',
        }),
      ],
    }).compile()

    service = module.get(MongoDbService)
  })

  afterEach(async () => {
    await service.db('testdb').dropDatabase()
    await service.client.close()
  })

  it('connects to mongodb', () => {
    expect(service).toBeDefined()
    expect(service.client).toBeInstanceOf(MongoClient)
    expect(service.db()).toBeInstanceOf(Db)
  })

  it('gets a collection', () => {
    expect(service.collection('test_collection')).toBeDefined()
  })

  it('writes and reads data', async () => {
    const collection = service.collection('test_collection', 'testdb')

    const data = { name: 'test' }
    await collection.insertOne(data)

    const result = await collection.findOne({ name: 'test' })
    expect(result).toEqual(data)

    await collection.deleteOne({ name: 'test' })

    const result2 = await collection.findOne({ name: 'test' })
    expect(result2).toBeNull()
  })
})
