import { Test } from '@nestjs/testing'

import { MongoDbModule } from '../mongodb.module'
import { MongoDbService } from '../mongodb.service'

describe(MongoDbService, () => {
  let service: MongoDbService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MongoDbModule.forRoot({
          uri: 'mongodb://root:root@localhost:27017',
        }),
      ],
    }).compile()

    service = module.get(MongoDbService)
  })

  afterAll(async () => {
    await service.client.close()
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
    expect(service.client).toBeTruthy()
  })
})
