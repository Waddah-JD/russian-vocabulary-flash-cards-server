import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database';
import { ConfigModule } from './config';
import { EnglishTranslationsModule } from './english-translations';
import { HealthCheckModule } from './health-check';
import { UsersModule } from './users';
import { WordsModule } from './words';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    HealthCheckModule,
    WordsModule,
    EnglishTranslationsModule,
    UsersModule,
  ],
})
export class AppModule {}
