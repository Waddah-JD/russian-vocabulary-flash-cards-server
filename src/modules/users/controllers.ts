import { UseAuthenticationGuard } from '@modules/auth/decorators';
import { AuthenticatedRequest } from '@modules/auth/types';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';

import { CreateUserDto } from './schemas';
import { UsersService } from './services';

@Controller('v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    await this.usersService.create(body);
  }

  @UseAuthenticationGuard()
  @Get('me')
  async getMe(@Req() req: AuthenticatedRequest) {
    return await this.usersService.findByIdOrFail(req.user.uid);
  }
}
