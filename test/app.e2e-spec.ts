import { AppModule } from '@modules/app';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/health-check', () => {
    it('/status (GET)', () => {
      return request(app.getHttpServer())
        .get('/health-check/status')
        .expect(200)
        .expect('true');
    });
  });
});
