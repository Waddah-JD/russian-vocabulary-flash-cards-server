import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPracticeCountersWithDefaultValues1678363722286
  implements MigrationInterface
{
  name = 'AddPracticeCountersWithDefaultValues1678363722286';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_words" ADD "successfulPracticeCount" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_words" ADD "failedPracticeCount" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_623544110d27166176a5473c13" ON "users_words" ("successfulPracticeCount") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0d968cf4233dc1001f763fdfcc" ON "users_words" ("failedPracticeCount") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0d968cf4233dc1001f763fdfcc"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_623544110d27166176a5473c13"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_words" DROP COLUMN "failedPracticeCount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_words" DROP COLUMN "successfulPracticeCount"`,
    );
  }
}
