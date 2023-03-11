import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  PaginatedSearchQuery,
  PaginatedSearchQueryResponse,
} from 'src/schemas/pagination';

import { EnglishTranslation } from './entities';
import { EnglishTranslationsService } from './services';

@Controller('v1/english-transitions')
export class EnglishTranslationController {
  constructor(private englishTranslationsService: EnglishTranslationsService) {}

  @Get('search')
  async search(
    @Query() query: PaginatedSearchQuery,
  ): Promise<PaginatedSearchQueryResponse<EnglishTranslation>> {
    return await this.englishTranslationsService.searchByWord(
      query.search,
      query.perPage,
      query.skip,
    );
  }

  @UseInterceptors(CacheInterceptor)
  @Get(':id')
  async getOneById(@Param('id') id: number): Promise<EnglishTranslation> {
    return await this.englishTranslationsService.findOneByIdOrFail(id);
  }
}
