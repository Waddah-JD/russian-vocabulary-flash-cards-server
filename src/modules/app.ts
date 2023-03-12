import { DatabaseModule } from '@database/index';
import { CacheModule, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { redisStore } from 'cache-manager-ioredis-yet';

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
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          store: redisStore,
          host: configService.getConfig().cache.host,
          port: configService.getConfig().cache.port,
          password: configService.getConfig().cache.password,
          ttl: configService.getConfig().cache.ttl,
          db: 0,
        };
      },
      isGlobal: true,
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
