import { DynamicModule, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Microservice } from '@obeya/shared/infra/comms'

import { MongoDbClient } from './mongodb.client'
import { mongodb } from './mongodb.constants'
import { MongoDbService } from './mongodb.service'

interface MongoDbModuleOptions {
  microservice: Microservice
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

  static forRoot({ microservice }: MongoDbModuleOptions): DynamicModule {
    return {
      module: MongoDbModule,
      global: true,
      imports: [],
      providers: [
        {
          provide: MongoDbClient,
          inject: [ConfigService],
          useFactory: async (config: ConfigService): Promise<MongoDbClient> =>
            MongoDbClient.connect(`${config.get(mongodb.uri)}/${microservice}`),
        },
      ],
      exports: [MongoDbService],
    }
  }
}
