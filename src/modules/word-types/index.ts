import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WordType } from './entities';
import { WordTypesService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([WordType])],
  controllers: [],
  providers: [WordTypesService],
})
export class WordTypesModule {}
