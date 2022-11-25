import { SignupUserRequestDTO } from '../../../commands/signup/signup.user.dto'

export const fakeSignupUserDTO = (
  dto?: Partial<SignupUserRequestDTO>
): SignupUserRequestDTO => ({
  id: dto?.id ?? 'cce2fded-90cd-4ec9-8806-842834e73e6c',
  email: dto?.email ?? 'valid@email.com',
  password: dto?.password ?? 'valid_password',
})
