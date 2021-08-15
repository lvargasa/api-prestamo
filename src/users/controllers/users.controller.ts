import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Param
} from '@nestjs/common'
import { CreateUserDto } from '../dto/create-user.dto'
import { User } from '../entities/user.entity'
import { UsersService } from '../services/users.service'

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto)
  }

  @Get(':id/clients')
  getClients(@Param('id') id: number) {
    console.log(id)
    return this.usersService.getClients(id)
  }
}
