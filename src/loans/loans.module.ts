import { Module } from '@nestjs/common'
import { LoansService } from './services/loans.service'
import { LoansController } from './controllers/loans.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Loan } from './entities/loan.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Loan])],
  providers: [LoansService],
  controllers: [LoansController],
  exports: [LoansService]
})
export class LoansModule {}
