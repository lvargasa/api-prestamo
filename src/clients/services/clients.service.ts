import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Client } from '../entities/client.entity'
import { CreateClientDto } from '../dto/create-client.dto'

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>
  ) { }

  async create(clientDto: CreateClientDto): Promise<Client> {
    const client = this.clientsRepository.create(clientDto)
    return await this.clientsRepository.save(client)
  }

  async getLoans(id: number) {
    return this.clientsRepository.findOne(id, { relations: ['loans'] })
  }

  async updateClient(id: number, createClientDto: CreateClientDto) {
    let result: Client = null
    await this.clientsRepository.update(id,
      {
        name: createClientDto.name,
        dni: createClientDto.dni,
        phone: createClientDto.phone,
        ocupation: createClientDto.ocupation,
        address: createClientDto.address
      })
    return result = await this.clientsRepository.findOne(id)
  }

}
