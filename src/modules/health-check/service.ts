import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  getStatus(): boolean {
    return true;
  }
}
