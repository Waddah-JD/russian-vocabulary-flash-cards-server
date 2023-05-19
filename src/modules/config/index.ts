import { Module } from '@nestjs/common';
import { ConfigModule as BaseConfigModule } from '@nestjs/config';

import { ConfigService } from './services';
import { getEnvFileExtension } from './utils';

@Module({
  imports: [
    BaseConfigModule.forRoot({
      envFilePath: [`.env${getEnvFileExtension(process.env.NODE_ENV)}`],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
