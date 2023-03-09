import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnglishTranslationController } from './controllers';
import { EnglishTranslation } from './entities';
import { EnglishTranslationsService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([EnglishTranslation])],
  controllers: [EnglishTranslationController],
  providers: [EnglishTranslationsService],
  exports: [EnglishTranslationsService],
})
export class EnglishTranslationsModule {}
