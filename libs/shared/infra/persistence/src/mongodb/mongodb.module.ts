import { DynamicModule, Module } from '@nestjs/common'
import { Microservice } from '@obeya/shared/infra/comms'
import { Db, MongoClient } from 'mongodb'

import { MongoDbService } from './mongodb.service'

interface MongoDbModuleOptions {
  uri: string
  microservice: Microservice
}
@Module({
  controllers: [],
  providers: [MongoDbService],
  exports: [MongoDbService],
})
export class MongoDbModule {
  static forRoot({ uri, microservice }: MongoDbModuleOptions): DynamicModule {
    return {
      module: MongoDbModule,
      global: true,
      imports: [],
      providers: [
        {
          provide: 'DB_CONNECTION',
          useFactory: async (): Promise<Db> => {
            const client = await MongoClient.connect(uri)
            return client.db(`${microservice}`)
          },
        },
      ],
      exports: [MongoDbService],
    }
  }
}
