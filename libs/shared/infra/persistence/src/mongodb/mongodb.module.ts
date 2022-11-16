import { DynamicModule, Module } from '@nestjs/common'

import { MongoDbClient } from './mongodb.client'
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
  constructor(private readonly client: MongoDbClient) {}

  async onModuleDestroy() {
    await this.client.close()
  }

  static forRoot({ uri }: MongoDbModuleOptions): DynamicModule {
    return {
      module: MongoDbModule,
      global: true,
      imports: [],
      providers: [
        {
          provide: MongoDbClient,
          useFactory: async (): Promise<MongoDbClient> =>
            MongoDbClient.connect(uri),
        },
      ],
      exports: [MongoDbService],
    }
  }
}
