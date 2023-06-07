import { UseAuthenticationGuard } from '@modules/auth/decorators';
import { AuthenticatedRequest } from '@modules/auth/types';
import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import {
  PaginatedSearchQuery,
  PaginatedSearchQueryResponse,
} from '@schemas/pagination';
import { RequestWithUserId } from 'src/types';

import { Word } from './entities';
import { LearnWordsRequestQuery } from './schemas';
import { WordsService } from './services';

@Controller('v1/words')
export class WordsController {
  constructor(private wordsService: WordsService) {}

  @UseAuthenticationGuard()
  @Get('learn')
  async getWordsForLearning(
    @Req() req: AuthenticatedRequest,
    @Query() query: LearnWordsRequestQuery,
  ): Promise<Word[]> {
    return await this.wordsService.getRandomWordsExcludingWordsInUserCollection(
      req.user.uid,
      query.batchSize,
    );
  }

  @Get('search')
  async search(
    @Query() query: PaginatedSearchQuery,
  ): Promise<PaginatedSearchQueryResponse<Word>> {
    return await this.wordsService.searchByWord(
      query.search,
      query.perPage,
      query.skip,
    );
  }

  @Get(':id')
  async getOneById(
    @Req() req: RequestWithUserId,
    @Param('id') id: number,
  ): Promise<Word> {
    const userId = req.userId;

    return await this.wordsService.findByIdOrFail(id, userId);
  }
}
