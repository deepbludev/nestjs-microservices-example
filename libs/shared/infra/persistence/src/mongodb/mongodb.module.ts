import { DynamicModule, Module } from '@nestjs/common'
import { MongoClient } from 'mongodb'

import { MongoDbService } from './mongodb.service'

interface MongoDbModuleOptions {
  uri: string
}

@Module({
  controllers: [],
  providers: [MongoDbService],
  exports: [MongoDbService],
})
export class MongoDbModule {
  static forRoot({ uri }: MongoDbModuleOptions): DynamicModule {
    return {
      module: MongoDbModule,
      global: true,
      imports: [],
      providers: [
        {
          provide: 'MONGODB_CLIENT',
          useFactory: async (): Promise<MongoClient> =>
            MongoClient.connect(uri),
        },
      ],
      exports: [MongoDbService],
    }
  }
}
