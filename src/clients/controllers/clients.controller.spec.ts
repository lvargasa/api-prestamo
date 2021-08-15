import { Test, TestingModule } from '@nestjs/testing'
import { ClientsService } from '../services/clients.service'
import { ClientsController } from './clients.controller'

describe('ClientsController', () => {
  let controller: ClientsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [{ provide: ClientsService, useValue: {} }]
    }).compile()

    controller = module.get<ClientsController>(ClientsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
