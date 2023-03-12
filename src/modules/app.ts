import { DatabaseModule } from '@database/index';
import { CacheModule, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from './auth';
import { ConfigModule } from './config';
import { ConfigService } from './config/services';
import { EnglishTranslationsModule } from './english-translations';
import { FirebaseModule } from './firebase';
import { HealthCheckModule } from './health-check';
import { UsersWordsModule } from './user-words';
import { UsersModule } from './users';
import { WordsModule } from './words';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 24 * 60 * 60 * 1000, // 1 Day (cache-manager v5 uses ms)
      max: 100,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          ttl: configService.getConfig().rateLimiter.ttl,
          limit: configService.getConfig().rateLimiter.limit,
        };
      },
    }),
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
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
