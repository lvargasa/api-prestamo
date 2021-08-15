import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { CryptoService } from '../../crypto/services/crypto.service'
import { Client } from '../entities/client.entity'
import { ClientsService } from './clients.service'

describe('ClientsService', () => {
  let service: ClientsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: getRepositoryToken(Client),
          useValue: {}
        },
        {
          provide: CryptoService,
          useValue: {}
        }
      ]
    }).compile()

    service = module.get<ClientsService>(ClientsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
