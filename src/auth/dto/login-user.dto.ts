import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly username: string

  @MinLength(8)
  @IsNotEmpty()
  readonly password: string
}
