import { AuthModule } from '@modules/auth';
import { EnglishTranslationsModule } from '@modules/english-translations';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtractUserIdFromTokenMiddleware } from 'src/middleware/ExtractUserIdFromToken';

import { WordsController } from './controllers';
import { Noun, Verb, Word } from './entities';
import { WordsService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Word, Verb, Noun]),
    AuthModule,
    EnglishTranslationsModule,
  ],
  controllers: [WordsController],
  providers: [WordsService],
  exports: [WordsService],
})
export class WordsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExtractUserIdFromTokenMiddleware)
      .forRoutes({ path: '/v1/words/:id', method: RequestMethod.GET });
  }
}
