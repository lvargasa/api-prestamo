import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from '../dto/create-user.dto'
import { User } from '../entities/user.entity'
import { CryptoService } from '../../crypto/services/crypto.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private cryptoService: CryptoService
  ) { }

  getAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  async getByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ username })
  }

  async getById(id: number): Promise<User> | undefined {
    return this.usersRepository.findOne(id)
  }

  async getClients(id: number) {
    return this.usersRepository.findOne(id, { relations: ['clients', 'clients.loans']})
  }

  async create(userDto: CreateUserDto): Promise<User> {
    userDto.password = await this.cryptoService.hash(userDto.password)
    const user = this.usersRepository.create(userDto)
    return await this.usersRepository.save(user)
  }
}
