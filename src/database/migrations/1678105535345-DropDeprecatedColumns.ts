import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropDeprecatedColumns1678105535345 implements MigrationInterface {
  name = 'DropDeprecatedColumns1678105535345';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_93717d5065c143ffe5e986404d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_69526a5bd501cf2f014e1918e5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_words" DROP COLUMN "lastShownToUserAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_words" DROP COLUMN "addedToCollectionAt"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_words" ADD "addedToCollectionAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_words" ADD "lastShownToUserAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_69526a5bd501cf2f014e1918e5" ON "users_words" ("addedToCollectionAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_93717d5065c143ffe5e986404d" ON "users_words" ("lastShownToUserAt") `,
    );
  }
}
