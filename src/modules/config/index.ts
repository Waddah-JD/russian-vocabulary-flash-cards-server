import { Module } from '@nestjs/common';
import { ConfigModule as BaseConfigModule } from '@nestjs/config';

import { ConfigService } from './service';

function getEnvFileExtension(env?: string) {
  switch (env) {
    case 'test':
      return 'test';
    case 'production':
      return 'prod';
    case 'development':
    default:
      return 'dev';
  }
}

@Module({
  imports: [
    BaseConfigModule.forRoot({
      envFilePath: [`.env.${getEnvFileExtension(process.env.NODE_ENV)}`],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
