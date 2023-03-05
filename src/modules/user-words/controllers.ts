import { UseAuthenticationGuard } from '@modules/auth/decorators';
import { AuthenticatedRequest } from '@modules/auth/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';

import { AddWordToCollectionDTO, LearnWordsRequestQuery } from './schemas';
import { UsersWordsService } from './services';

@Controller('v1/users-words')
@UseAuthenticationGuard()
export class UsersWordsController {
  constructor(private readonly usersWordsService: UsersWordsService) {}

  @UseAuthenticationGuard()
  @Get('learn')
  async getWordsForLearning(
    @Req() req: AuthenticatedRequest,
    @Query() query: LearnWordsRequestQuery,
  ) {
    return await this.usersWordsService.getWordsForLearning(
      req.user.uid,
      query.batchSize,
      query.allowPreviouslyShownWords === 'true',
    );
  }

  @Get(':wordId')
  async getOne(
    @Req() req: AuthenticatedRequest,
    @Param('wordId') wordId: number,
  ) {
    return await this.usersWordsService.findByIdOrFail(req.user.uid, wordId);
  }

  @Post(':wordId')
  async addToCollection(
    @Req() req: AuthenticatedRequest,
    @Param('wordId') wordId: number,
    @Body() body: AddWordToCollectionDTO,
  ) {
    await this.usersWordsService.addToCollection(
      req.user.uid,
      wordId,
      body.notes,
    );
  }

  @Delete(':wordId')
  async removeFromCollection(
    @Req() req: AuthenticatedRequest,
    @Param('wordId') wordId: number,
  ) {
    await this.usersWordsService.removeFromCollection(req.user.uid, wordId);
  }
}
