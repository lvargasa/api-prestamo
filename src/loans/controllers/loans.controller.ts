import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Put,
  Param,
  Delete
} from '@nestjs/common'
import { CreateLoanDto } from '../dto/create-loan.dto'
import { Loan } from '../entities/loan.entity'
import { LoansService } from '../services/loans.service'

@Controller('loans')
@UseInterceptors(ClassSerializerInterceptor)
export class LoansController {
  constructor(private loansService: LoansService) { }

  @Post()
  create(@Body() createLoanDto: CreateLoanDto): Promise<Loan> {
    createLoanDto.total = createLoanDto.ammount + createLoanDto.ammount * (createLoanDto.rate / 100)
    createLoanDto.debt = createLoanDto.total
    createLoanDto.share = createLoanDto.total / createLoanDto.days
    return this.loansService.create(createLoanDto)
  }

  @Get(':id/payments')
  getPayments(@Param('id') id: number) {
    return this.loansService.getPayments(id)
  }

  @Get('all')
  getLoansAll() {
    return this.loansService.getLoansAll()
  }

  @Put(':id')
  updateLaon(@Param('id') id: number, @Body() createLoanDto: CreateLoanDto) {
    createLoanDto.total = createLoanDto.ammount + createLoanDto.ammount * (createLoanDto.rate / 100)
    createLoanDto.debt = createLoanDto.total
    createLoanDto.share = createLoanDto.total / createLoanDto.days
    return this.loansService.updateLoan(id, createLoanDto)
  }

  @Delete(':id/delete')
  delete(@Param('id') id) {
    return this.loansService.deleteLoan(id);
  }

  @Get('/byDay')
  getLoansByDay() {
    return this.loansService.getLoansByDay()
  }

}
