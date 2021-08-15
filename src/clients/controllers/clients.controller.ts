import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Param,
  Put
} from '@nestjs/common'
import { CreateClientDto } from '../dto/create-client.dto'
import { Client } from '../entities/client.entity'
import { ClientsService } from '../services/clients.service'

@Controller('clients')
@UseInterceptors(ClassSerializerInterceptor)
export class ClientsController {
  constructor(private clientsService: ClientsService) { }

  @Post()
  create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientsService.create(createClientDto)
  }

  @Get(':id/loans')
  getLoansByClient(@Param('id') id: number) {
    return this.clientsService.getLoans(id)
  }

  @Put(':id')
  updateClient(@Param('id') id: number, @Body() createClientDto: CreateClientDto) {
    return this.clientsService.updateClient(id, createClientDto)
  }

}
