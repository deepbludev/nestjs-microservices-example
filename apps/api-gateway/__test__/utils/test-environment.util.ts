import { INestApplication, Type, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { MongoDbService } from '@obeya/shared/infra/persistence'
import supertest from 'supertest'

import { TestLogger } from './test-logger'

export class TestEnvironment {
  dbClient: MongoDbService

  private constructor(
    public readonly app: INestApplication,
    public readonly module: TestingModule
  ) {
    this.dbClient = module.get(MongoDbService)
  }

  static async init(microservice: Type) {
    const module: TestingModule = await Test.createTestingModule({
      imports: [microservice],
    }).compile()

    const app = module.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())

    const env = new TestEnvironment(app, module)
    await env.app.init()
    return env
  }

  request() {
    return supertest(this.app.getHttpServer())
  }

  close() {
    return Promise.all([this.app.close()])
  }

  public logger: TestLogger = new TestLogger()

  useLogger(logger?: TestLogger) {
    this.logger = logger || this.logger || new TestLogger()
    this.app.useLogger(this.logger)
    return this
  }
}
