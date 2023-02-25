import { Module } from '@nestjs/common';
import { HealthCheckController } from './controller';
import { HealthCheckService } from './service';

@Module({
  imports: [],
  controllers: [HealthCheckController],
  providers: [HealthCheckService],
})
export class HealthCheckModule {}
