import { AppModule } from '@modules/app';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/health-check', () => {
    it('/status (GET)', () => {
      return request(app.getHttpServer())
        .get('/health-check/status')
        .expect(200)
        .expect(JSON.stringify({ app: true, db: true }));
    });
  });
});
