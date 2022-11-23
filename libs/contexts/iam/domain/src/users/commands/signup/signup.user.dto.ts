import { UserDTO } from '../../model/user.dto'

export type SignupUserRequestDTO = Pick<UserDTO, 'id' | 'email' | 'password'>

export type SignupUserResponseDTO = Pick<UserDTO, 'id'>
