import { Module } from '@nestjs/common';

import { ConfigModule } from './config';
import { DatabaseModule } from './database';
import { HealthCheckModule } from './health-check';

@Module({
  imports: [ConfigModule, DatabaseModule, HealthCheckModule],
})
export class AppModule {}
