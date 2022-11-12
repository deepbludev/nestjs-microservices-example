import { HttpStatus } from '@nestjs/common'

import { ApiGatewayModule } from '../../src/app/api-gateway.module'
import { TestEnvironment } from '../utils/test-environment.util'

describe('API Gateway (e2e)', () => {
  let api: TestEnvironment

  beforeEach(async () => {
    api = await TestEnvironment.init(ApiGatewayModule)
  })

  afterEach(async () => {
    await api.close()
  })

  describe('/status', () => {
    describe('GET', () => {
      it('returns http status 200 OK', () => {
        return api.request().get('/status').expect(HttpStatus.OK)
      })
    })
  })

  describe('/iam', () => {
    describe('/status', () => {
      describe('GET', () => {
        it('returns http status 200 OK', () => {
          return api.request().get('/iam/status').expect(HttpStatus.OK)
        })
      })
    })
  })
})
