import { Controller, Get, Param } from '@nestjs/common';

import { Word } from './entities';
import { WordsService } from './services';

@Controller('v1/words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}
  @Get(':id')
  async getOneById(@Param('id') id: number): Promise<Word> {
    return await this.wordsService.findOneByIdOrFail(id);
  }
}
