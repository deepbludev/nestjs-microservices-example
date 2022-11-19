import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator'

import { IsUserEmail, UserEmail } from './user.email.vo'

export class UserDTO {
  @IsUUID()
  id: string

  @IsUserEmail({ message: UserEmail.invalidMessage })
  email: string

  @IsString()
  @MinLength(10)
  @MaxLength(255)
  password: string
}
