import { Test } from '@nestjs/testing'
import { Microservice } from '@obeya/shared/infra/comms'

import { MongoDbModule } from '../mongodb.module'
import { MongoDbService } from '../mongodb.service'

describe(MongoDbService, () => {
  let service: MongoDbService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MongoDbModule.forRoot({
          uri: 'mongodb://localhost:27017',
          microservice: Microservice.IAM,
        }),
      ],
    }).compile()

    service = module.get(MongoDbService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
