import { Module } from '@nestjs/common';

import { ConfigModule } from './config';
import { HealthCheckModule } from './health-check';

@Module({
  imports: [ConfigModule, HealthCheckModule],
})
export class AppModule {}
