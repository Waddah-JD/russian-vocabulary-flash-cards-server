import { MigrationInterface, QueryRunner } from 'typeorm';

export class DopPracticeCounters1678363681382 implements MigrationInterface {
  name = 'DopPracticeCounters1678363681382';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_623544110d27166176a5473c13"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0d968cf4233dc1001f763fdfcc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_words" DROP COLUMN "successfulPracticeCount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_words" DROP COLUMN "failedPracticeCount"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_words" ADD "failedPracticeCount" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_words" ADD "successfulPracticeCount" integer`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0d968cf4233dc1001f763fdfcc" ON "users_words" ("failedPracticeCount") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_623544110d27166176a5473c13" ON "users_words" ("successfulPracticeCount") `,
    );
  }
}
