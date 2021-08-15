import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { CryptoService } from '../../crypto/services/crypto.service'
import { Loan } from '../entities/loan.entity'
import { LoansService } from './loans.service'

describe('LoansService', () => {
  let service: LoansService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoansService,
        {
          provide: getRepositoryToken(Loan),
          useValue: {}
        },
        {
          provide: CryptoService,
          useValue: {}
        }
      ]
    }).compile()

    service = module.get<LoansService>(LoansService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
