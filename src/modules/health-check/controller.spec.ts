import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './controller';
import { HealthCheckService } from './service';

describe(HealthCheckController.name, () => {
  let healthCheckController: HealthCheckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [HealthCheckService],
    }).compile();

    healthCheckController = app.get<HealthCheckController>(
      HealthCheckController,
    );
  });

  describe('getStatus', () => {
    it('should return true', () => {
      expect(healthCheckController.getStatus()).toBe(true);
    });
  });
});
