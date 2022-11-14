import { SignupUserAmqpRpcController } from '../signup.user.amqp.rpc.controller'

describe(SignupUserAmqpRpcController, () => {
  const ctrl = new SignupUserAmqpRpcController()

  describe('#signup', () => {
    describe('when email and password are valid', () => {
      it('returns status 201 Created', async () => {
        const dto = {
          id: 'cce2fded-90cd-4ec9-8806-842834e73e6c',
          email: 'valid@email.com',
          password: 'valid_password',
        }

        const response = await ctrl.run(dto)

        expect(response).toEqual({
          data: { id: dto.id },
          status: 201,
          message: `User ${dto.email} created`,
        })
      })
    })
  })
})
