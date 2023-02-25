import { Module } from '@nestjs/common';
import { ConfigModule as BaseConfigModule } from '@nestjs/config';

import { ZConfigService } from './service';

@Module({
  imports: [BaseConfigModule.forRoot({ envFilePath: ['.env'] })],
  providers: [ZConfigService],
  exports: [ZConfigService],
})
export class ConfigModule {}
