import { AggregateDTO, UserId } from '@obeya/shared/domain'
import { z } from 'zod'

import { UserEmail } from './user.email.vo'
import { UserPassword } from './user.password.vo'

export const UserSchema = z.object({
  id: z.string().refine(UserId.isValid, { message: UserId.errorMessage }),
  email: z
    .string()
    .refine(UserEmail.isValid, { message: UserEmail.errorMessage }),
  password: z
    .string()
    .refine(UserPassword.isValid, { message: UserPassword.errorMessage }),
  version: z.number().gte(-1),
})

export type UserDTO = z.infer<typeof UserSchema> & AggregateDTO

/** Create User */
export type CreateUserDTO = Pick<UserDTO, 'id' | 'email' | 'password'>
