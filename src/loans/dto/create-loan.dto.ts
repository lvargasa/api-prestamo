import { IsNotEmpty, MinLength, MaxLength, IsNumber} from 'class-validator'

export class CreateLoanDto {

  @IsNumber()
  clientId : number

  @IsNumber()
  rate: number

  @IsNumber()
  ammount: number

  @IsNumber()
  days: number

  total: number

  share: number

  debt: number

}
