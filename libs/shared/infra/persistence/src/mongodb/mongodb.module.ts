import { DynamicModule, Module } from '@nestjs/common'

import { MongoDbService } from './mongodb.service'

@Module({
  controllers: [],
  providers: [MongoDbService],
  exports: [MongoDbService],
})
export class MongoDbModule {
  static forRoot(): DynamicModule {
    return {
      module: MongoDbModule,
      global: true,
      imports: [],
      exports: [MongoDbService],
    }
  }
}
