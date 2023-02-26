import { Module } from '@nestjs/common';

import { ConfigModule } from './config';
import { DatabaseModule } from './database';
import { HealthCheckModule } from './health-check';
import { WordTypesModule } from './word-types';

@Module({
  imports: [ConfigModule, DatabaseModule, HealthCheckModule, WordTypesModule],
})
export class AppModule {}
