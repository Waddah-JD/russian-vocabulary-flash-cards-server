import { UseAuthenticationGuard } from '@modules/auth/decorators';
import { AuthenticatedRequest } from '@modules/auth/types';
import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';

import { CreateUserWordBodyDTO } from './schemas';
import { UsersWordsService } from './services';

@Controller('v1/users-words')
@UseAuthenticationGuard()
export class UsersWordsController {
  constructor(private readonly usersWordsService: UsersWordsService) {}

  @Post()
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() body: CreateUserWordBodyDTO,
  ) {
    await this.usersWordsService.create(req.user.uid, body.wordId);
  }

  @Get(':wordId')
  async getOne(
    @Req() req: AuthenticatedRequest,
    @Param('wordId') wordId: number,
  ) {
    return await this.usersWordsService.findByIdOrFail(req.user.uid, wordId);
  }
}
