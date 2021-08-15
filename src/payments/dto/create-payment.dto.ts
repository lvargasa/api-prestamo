import { IsNotEmpty, MinLength, MaxLength, IsNumber } from 'class-validator'

export class CreatePaymentDto {

  @IsNumber()
  ammount: number

  @IsNumber()
  loanId: number

}
