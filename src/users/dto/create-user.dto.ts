import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  username: string

  @MinLength(8)
  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  name: string
}
