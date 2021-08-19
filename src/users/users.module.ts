import { Module } from '@nestjs/common'
import { UsersService } from './services/users.service'
import { UsersController } from './controllers/users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { CryptoModule } from 'src/crypto/crypto.module'
import { Client } from 'src/clients/entities/client.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Client]), CryptoModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
