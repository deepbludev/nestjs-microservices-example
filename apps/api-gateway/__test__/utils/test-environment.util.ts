import { INestApplication, Type } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import supertest from 'supertest'

import { TestLogger } from './test-logger'

export class TestEnvironment {
  private constructor(
    public readonly app: INestApplication,
    public readonly module: TestingModule
  ) {}

  static async init(microservice: Type) {
    const module: TestingModule = await Test.createTestingModule({
      imports: [microservice],
    }).compile()

    const app = module.createNestApplication()
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
