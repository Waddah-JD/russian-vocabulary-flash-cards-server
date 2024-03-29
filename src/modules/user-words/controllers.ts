import { UseAuthenticationGuard } from '@modules/auth/decorators';
import { AuthenticatedRequest } from '@modules/auth/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';

import {
  AddWordToCollectionDTO,
  PracticeWordResult,
  PracticeWordsRequestQuery,
} from './schemas';
import { UsersWordsService } from './services';

@Controller('v1/users-words')
@UseAuthenticationGuard()
export class UsersWordsController {
  constructor(private usersWordsService: UsersWordsService) {}

  @Get('practice')
  @UseAuthenticationGuard()
  async getWordsForPractice(
    @Req() req: AuthenticatedRequest,
    @Query() query: PracticeWordsRequestQuery,
  ) {
    return await this.usersWordsService.getWordsForPractice(
      req.user.uid,
      query.batchSize,
    );
  }

  @Put('/practice/:wordId')
  @UseAuthenticationGuard()
  async submitPracticeResult(
    @Req() req: AuthenticatedRequest,
    @Param('wordId') wordId: number,
    @Body() query: PracticeWordResult,
  ) {
    await this.usersWordsService.submitPracticeResult(
      req.user.uid,
      wordId,
      query.successful,
    );
  }

  @Get(':wordId')
  async getOneWordFromUserCollection(
    @Req() req: AuthenticatedRequest,
    @Param('wordId') wordId: number,
  ) {
    return await this.usersWordsService.findByUserIdAndWordIdOrFail(
      req.user.uid,
      wordId,
    );
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
