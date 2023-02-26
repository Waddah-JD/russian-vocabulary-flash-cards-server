import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { HealthCheckResult } from './types';

@Injectable()
export class HealthCheckService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async getStatus(): Promise<HealthCheckResult> {
    return {
      app: this.getAppStatus(),
      db: await this.getDbStatus(),
    };
  }

  private getAppStatus(): boolean {
    // TODO implement me with https://docs.nestjs.com/recipes/terminus#healthchecks-terminus
    return true;
  }

  private async getDbStatus(): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    const result = await queryRunner.query('SELECT CURRENT_DATE;');
    return Boolean(result[0]?.current_date) || false;
  }
}
