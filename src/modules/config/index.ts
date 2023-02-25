import { Module } from '@nestjs/common';
import { ConfigModule as BaseConfigModule } from '@nestjs/config';

import { ConfigService } from './service';

@Module({
  imports: [BaseConfigModule.forRoot({ envFilePath: ['.env'] })],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
