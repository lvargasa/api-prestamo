import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Param,
  Put,
  Delete
} from '@nestjs/common'
import { CreatePaymentDto } from '../dto/create-payment.dto'
import { Payment } from '../entities/payment.entity'
import { PaymentsService } from '../services/payments.service'

@Controller('payments')
@UseInterceptors(ClassSerializerInterceptor)
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) { }

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentsService.create(createPaymentDto)
  }

  @Put(':id')
  updatePayment(@Param('id') id: number, @Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentsService.updatePayment(id, createPaymentDto)
  }

  @Delete(':id/delete')
  delete(@Param('id') id): Promise<Payment> {
    return this.paymentsService.deletePayment(id);
  }

  @Get('/byDay')
  getPaymentsByDay() {
    return this.paymentsService.getPaymentsByDay()
  }

}
