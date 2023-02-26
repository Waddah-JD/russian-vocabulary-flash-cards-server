import { DatabaseModule } from '@modules/database';
import { Test, TestingModule } from '@nestjs/testing';

import { HealthCheckController } from './controllers';
import { HealthCheckService } from './services';

describe(HealthCheckController.name, () => {
  let healthCheckController: HealthCheckController;
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [HealthCheckController],
      providers: [HealthCheckService],
    }).compile();

    healthCheckController = app.get<HealthCheckController>(
      HealthCheckController,
    );
  });

  afterAll(async () => {
    await app.close();
  });

  describe('getStatus', () => {
    it('should return true', async () => {
      const status = await healthCheckController.getStatus();
      expect(status).toStrictEqual({ app: true, db: true });
    });
  });
});
