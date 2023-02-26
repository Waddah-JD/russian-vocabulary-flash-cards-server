import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database';
import { ConfigModule } from './config';
import { HealthCheckModule } from './health-check';
import { WordTypesModule } from './word-types';

@Module({
  imports: [ConfigModule, DatabaseModule, HealthCheckModule, WordTypesModule],
})
export class AppModule {}
