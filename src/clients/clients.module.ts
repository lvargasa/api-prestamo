import { Module } from '@nestjs/common'
import { ClientsService } from './services/clients.service'
import { ClientsController } from './controllers/clients.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Client } from './entities/client.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [ClientsService],
  controllers: [ClientsController],
  exports: [ClientsService]
})
export class ClientsModule {}
