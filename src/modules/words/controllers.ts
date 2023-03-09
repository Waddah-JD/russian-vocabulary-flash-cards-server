import { UseAuthenticationGuard } from '@modules/auth/decorators';
import { AuthenticatedRequest } from '@modules/auth/types';
import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import {
  PaginatedSearchQuery,
  PaginatedSearchQueryResponse,
} from 'src/schemas/pagination';

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
  async getOneById(@Param('id') id: number): Promise<Word> {
    return await this.wordsService.findByIdOrFail(id);
  }
}
