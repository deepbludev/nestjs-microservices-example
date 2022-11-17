import {
  IsEmail,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator'

export class UserDTO {
  @IsUUID()
  id: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(10)
  @MaxLength(255)
  password: string
}
