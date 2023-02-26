import { Module } from '@nestjs/common';

import { HealthCheckController } from './controllers';
import { HealthCheckService } from './services';

@Module({
  imports: [],
  controllers: [HealthCheckController],
  providers: [HealthCheckService],
})
export class HealthCheckModule {}
