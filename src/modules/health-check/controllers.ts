import { Controller, Get } from '@nestjs/common';

import { HealthCheckService } from './services';
import { HealthCheckResult } from './types';

@Controller('v1/health-check')
export class HealthCheckController {
  constructor(private healthCheckService: HealthCheckService) {}

  @Get('status')
  getStatus(): Promise<HealthCheckResult> {
    return this.healthCheckService.getStatus();
  }
}
