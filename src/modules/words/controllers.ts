import { UseAuthenticationGuard } from '@modules/auth/decorators';
import { AuthenticatedRequest } from '@modules/auth/types';
import { Controller, Get, Param, Query, Req } from '@nestjs/common';

import { Word } from './entities';
import { LearnWordsRequestQuery } from './schemas';
import { WordsService } from './services';

@Controller('v1/words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @UseAuthenticationGuard()
  @Get('learn')
  async getWordsForLearning(
    @Req() req: AuthenticatedRequest,
    @Query() query: LearnWordsRequestQuery,
  ) {
    return await this.wordsService.getRandomWordsExcludingWordsInUserCollection(
      req.user.uid,
      query.batchSize,
    );
  }

  @Get(':id')
  async getOneById(@Param('id') id: number): Promise<Word> {
    return await this.wordsService.findByIdOrFail(id);
  }
}
