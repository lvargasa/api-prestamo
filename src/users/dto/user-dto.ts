import { IsNotEmpty, IsEmail } from 'class-validator'

export class UserDto {
  @IsNotEmpty()
  id: string

  @IsEmail()
  @IsNotEmpty()
  username: string
}
