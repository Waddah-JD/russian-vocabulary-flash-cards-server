import { Controller, Get } from '@nestjs/common';

import { HealthCheckService } from './services';
import { HealthCheckResult } from './types';

@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get('status')
  getStatus(): Promise<HealthCheckResult> {
    return this.healthCheckService.getStatus();
  }
}
