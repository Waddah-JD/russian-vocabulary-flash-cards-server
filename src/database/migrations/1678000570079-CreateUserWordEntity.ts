import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserWordEntity1678000570079 implements MigrationInterface {
  name = 'CreateUserWordEntity1678000570079';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users_words" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "lastShownToUserAt" TIMESTAMP, "addedToCollectionAt" TIMESTAMP, "lastPracticedAt" TIMESTAMP, "successfulPracticeCount" integer, "failedPracticeCount" integer, "notes" character varying, "userId" character varying, "wordId" integer, CONSTRAINT "PK_d05e855d3a80a5a35413b30f939" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_93717d5065c143ffe5e986404d" ON "users_words" ("lastShownToUserAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_69526a5bd501cf2f014e1918e5" ON "users_words" ("addedToCollectionAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5667355f2a9cacf0ad07126767" ON "users_words" ("lastPracticedAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_623544110d27166176a5473c13" ON "users_words" ("successfulPracticeCount") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0d968cf4233dc1001f763fdfcc" ON "users_words" ("failedPracticeCount") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users_words" ADD CONSTRAINT "FK_4a529657cc2816f39c6bf34c0d8" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_words" ADD CONSTRAINT "FK_68aaab1fbd9c9dc5306b97e47bc" FOREIGN KEY ("wordId") REFERENCES "words"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_words" DROP CONSTRAINT "FK_68aaab1fbd9c9dc5306b97e47bc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_words" DROP CONSTRAINT "FK_4a529657cc2816f39c6bf34c0d8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0d968cf4233dc1001f763fdfcc"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_623544110d27166176a5473c13"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5667355f2a9cacf0ad07126767"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_69526a5bd501cf2f014e1918e5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_93717d5065c143ffe5e986404d"`,
    );
    await queryRunner.query(`DROP TABLE "users_words"`);
  }
}
