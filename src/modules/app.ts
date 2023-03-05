import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database';
import { AuthModule } from './auth';
import { ConfigModule } from './config';
import { EnglishTranslationsModule } from './english-translations';
import { FirebaseModule } from './firebase';
import { HealthCheckModule } from './health-check';
import { UsersWordsModule } from './user-words';
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
    FirebaseModule,
    AuthModule,
    UsersWordsModule,
  ],
})
export class AppModule {}
