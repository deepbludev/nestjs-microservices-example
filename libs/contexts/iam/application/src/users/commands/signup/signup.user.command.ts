import { CreateUserDTO, UserSchema } from '@obeya/contexts/iam/domain'
import { canonical, Command } from '@obeya/shared/domain'
import { z } from 'zod'

export const SignupUserRequestSchema = UserSchema.pick({
  id: true,
  email: true,
  password: true,
})

export type SignupUserRequestDTO = z.infer<typeof SignupUserRequestSchema>

export type SignupUserResponseDTO = Pick<CreateUserDTO, 'id'>

@canonical('cmd:iam.users.signup')
export class SignupUser extends Command<SignupUserRequestDTO> {}
