import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './service';

@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get('status')
  getStatus(): boolean {
    return this.healthCheckService.getStatus();
  }
}
