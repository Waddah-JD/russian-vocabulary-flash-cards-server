import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto } from './schemas';
import { UsersService } from './services';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    await this.usersService.create(body);
  }
}
