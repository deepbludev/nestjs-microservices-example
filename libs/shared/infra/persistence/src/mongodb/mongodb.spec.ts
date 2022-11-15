import { Test } from '@nestjs/testing'

import { MongoDbService } from './mongodb.service'

describe(MongoDbService, () => {
  let service: MongoDbService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MongoDbService],
    }).compile()

    service = module.get(MongoDbService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
