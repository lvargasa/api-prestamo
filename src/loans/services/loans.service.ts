import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityManager, Repository } from 'typeorm'
import { Loan } from '../entities/loan.entity'
import { CreateLoanDto } from '../dto/create-loan.dto'

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Loan)
    private loansRepository: Repository<Loan>,

    private manager: EntityManager

  ) { }

  async create(loanDto: CreateLoanDto): Promise<Loan> {
    const loan = this.loansRepository.create(loanDto)
    return await this.loansRepository.save(loan)
  }

  async getPayments(id: number) {
    return this.loansRepository.findOne(id, { relations: ['payments'] })
  }

  async getLoansAll() {
    return this.loansRepository.find()
  }

  async updateLoan(id: number, createLoanDto: CreateLoanDto) {
    let result: Loan = null
    await this.loansRepository.update(id,
      {
        debt: createLoanDto.debt,
        ammount: createLoanDto.ammount,
        total: createLoanDto.total,
        share: createLoanDto.share,
        rate: createLoanDto.rate,
        days: createLoanDto.days
      })
    return result = await this.loansRepository.findOne(id)
  }

  async deleteLoan(id: number) {
    return await this.loansRepository.delete(id);
  }

  async getLoansByDay() {
    return this.manager.query(`select * from sp_reportLoanByDay()`)
  }

}
