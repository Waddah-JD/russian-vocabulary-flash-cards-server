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

  describe('/v1/health-check', () => {
    it('/status (GET)', () => {
      return request(app.getHttpServer())
        .get('/v1/health-check/status')
        .expect(200)
        .expect(JSON.stringify({ app: true, db: true }));
    });
  });

  describe('/v1/words', () => {
    it('/:id (GET)', () => {
      return request(app.getHttpServer())
        .get('/v1/words/2')
        .expect(200)
        .expect(
          JSON.stringify({
            id: 2,
            word: 'в',
            pronunciation: 'v',
            accented: 'в',
            type: 'preposition',
            noun: null,
            verb: null,
            englishTranslations: [
              { id: 4, translation: 'in' },
              { id: 5, translation: 'at' },
            ],
          }),
        );
    });

    it('search (GET)', () => {
      const encodedUri = encodeURI(
        '/v1/words/search?search=с&page=1&perPage=1',
      );
      return request(app.getHttpServer())
        .get(encodedUri)
        .expect(200)
        .expect(
          JSON.stringify({
            data: [
              {
                id: 94,
                word: 'слово',
                pronunciation: 'slóvo',
                accented: 'слово',
                type: 'noun',
                verb: null,
                noun: {
                  id: 94,
                  gender: 'neuter',
                  isAnimate: false,
                  declensionNominativeSingular: 'сло́во',
                  declensionNominativePlural: 'слова́',
                  declensionGenitiveSingular: 'сло́ва',
                  declensionGenitivePlural: 'сло́в',
                  declensionDativeSingular: 'сло́ву',
                  declensionDativePlural: 'слова́м',
                  declensionAccusativeSingular: 'сло́во',
                  declensionAccusativePlural: 'слова́',
                  declensionInstrumentalSingular: 'сло́вом',
                  declensionInstrumentalPlural: 'слова́ми',
                  declensionPrepositionalSingular: 'сло́ве',
                  declensionPrepositionalPlural: 'слова́х',
                },
                englishTranslations: [
                  {
                    id: 9,
                    translation: 'word',
                  },
                  {
                    id: 10,
                    translation: 'term',
                  },
                ],
              },
            ],
            total: 2,
          }),
        );
    });
  });

  describe('/v1/english-translations', () => {
    it('/:id (GET)', () => {
      return request(app.getHttpServer())
        .get('/v1/english-translations/11')
        .expect(200)
        .expect(
          JSON.stringify({
            id: 11,
            translation: 'to ask',
            words: [
              {
                id: 155,
                word: 'спросить',
                pronunciation: 'sprosítʹ',
                accented: 'спросить',
                type: 'verb',
              },
              {
                id: 503,
                word: 'просить',
                pronunciation: 'prosítʹ',
                accented: 'просить',
                type: 'verb',
              },
            ],
          }),
        );
    });

    it('search (GET)', () => {
      return request(app.getHttpServer())
        .get('/v1/english-translations/search?search=to')
        .expect(200)
        .expect(
          JSON.stringify({
            data: [
              {
                id: 11,
                translation: 'to ask',
                words: [
                  {
                    id: 155,
                    word: 'спросить',
                    pronunciation: 'sprosítʹ',
                    accented: 'спросить',
                    type: 'verb',
                  },
                  {
                    id: 503,
                    word: 'просить',
                    pronunciation: 'prosítʹ',
                    accented: 'просить',
                    type: 'verb',
                  },
                ],
              },
              {
                id: 12,
                translation: 'to beg',
                words: [
                  {
                    id: 503,
                    word: 'просить',
                    pronunciation: 'prosítʹ',
                    accented: 'просить',
                    type: 'verb',
                  },
                ],
              },
            ],
            total: 2,
          }),
        );
    });
  });
});
