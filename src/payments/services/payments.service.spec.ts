import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { CryptoService } from '../../crypto/services/crypto.service'
import { Payment } from '../entities/payment.entity'
import { PaymentsService } from './payments.service'

describe('PaymentsService', () => {
  let service: PaymentsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        {
          provide: getRepositoryToken(Payment),
          useValue: {}
        },
        {
          provide: CryptoService,
          useValue: {}
        }
      ]
    }).compile()

    service = module.get<PaymentsService>(PaymentsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
