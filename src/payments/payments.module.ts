import { Module } from '@nestjs/common'
import { PaymentsService } from './services/payments.service'
import { PaymentsController } from './controllers/payments.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Payment } from './entities/payment.entity'
import { Loan } from 'src/loans/entities/loan.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), TypeOrmModule.forFeature([Loan])],
  providers: [PaymentsService],
  controllers: [PaymentsController],
  exports: [PaymentsService]
})
export class PaymentsModule {}
