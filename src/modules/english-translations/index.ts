import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnglishTranslation } from './entities';
import { EnglishTranslationsService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([EnglishTranslation])],
  controllers: [],
  providers: [EnglishTranslationsService],
  exports: [EnglishTranslationsService],
})
export class EnglishTranslationsModule {}
