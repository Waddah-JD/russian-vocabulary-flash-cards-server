import { EnglishTranslationsModule } from '@modules/english-translations';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WordsController } from './controllers';
import { Noun, Verb, Word } from './entities';
import { WordsService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Word, Verb, Noun]),
    EnglishTranslationsModule,
  ],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
