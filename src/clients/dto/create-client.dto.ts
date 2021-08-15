import { IsNotEmpty, MinLength, MaxLength, IsNumber} from 'class-validator'

export class CreateClientDto {
  @IsNotEmpty()
  name: string

  @MinLength(8)
  @MaxLength(8)
  @IsNotEmpty()
  dni: string

  phone: string

  address: string

  ocupation: string

  @IsNumber()
  userId : number

}
