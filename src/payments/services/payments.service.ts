import { Injectable, Param } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Connection, EntityManager, Repository } from 'typeorm'
import { Payment } from '../entities/payment.entity'
import { CreatePaymentDto } from '../dto/create-payment.dto'
import { Loan } from 'src/loans/entities/loan.entity'

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,

    @InjectRepository(Loan)
    private loansRepository: Repository<Loan>,

    private connection: Connection,

    private manager: EntityManager
  ) { }

  async create(paymentDto: CreatePaymentDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let result: Payment = null

    try {
      const payment = this.paymentsRepository.create(paymentDto)
      const loan: Loan = await this.loansRepository.findOne(payment.loanId)
      const deuda: number = loan.debt - payment.ammount;
      result = await this.paymentsRepository.save(payment)
      await this.loansRepository.update(payment.loanId, { debt: deuda })
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }

    return result
  }

  async updatePayment(id: number, createPaymentDto: CreatePaymentDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let result: Payment = null

    try {
      const payment: Payment = await this.paymentsRepository.findOne(id)
      let ammountPaymentOld = payment.ammount
      const loanId = payment.loanId;

      const loan: Loan = await this.loansRepository.findOne(loanId)
      let debtOld = loan.debt

      debtOld = ammountPaymentOld + debtOld //old debt sin el pago a modificar
      debtOld = debtOld - createPaymentDto.ammount // new debt

      await this.loansRepository.update(loanId, { debt: debtOld })
      await this.paymentsRepository.update(payment.id, { ammount: createPaymentDto.ammount })
      result = await this.paymentsRepository.findOne(id)
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }

    return result
  }

  async deletePayment(id: number) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let result: Payment = null

    try {
      const payment: Payment = await this.paymentsRepository.findOne(id)
      let ammountPaymentOld = payment.ammount
      const loanId = payment.loanId;

      const loan: Loan = await this.loansRepository.findOne(loanId)
      let debtOld = loan.debt

      debtOld = ammountPaymentOld + debtOld //old debt sin el pago a eliminar

      await this.loansRepository.update(loanId, { debt: debtOld })
      await this.paymentsRepository.delete(id)
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }

    return result
  }

  async getPaymentsByDay() {
    return this.manager.query(`select * from sp_reportPaymentByDay()`)
  }

}
