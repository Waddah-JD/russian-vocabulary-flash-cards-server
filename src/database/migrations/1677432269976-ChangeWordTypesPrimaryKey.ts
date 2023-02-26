import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeWordTypesPrimaryKey1677432269976
  implements MigrationInterface
{
  name = 'ChangeWordTypesPrimaryKey1677432269976';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "word_types" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "word_types_id_seq"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "word_types_id_seq" OWNED BY "word_types"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "word_types" ALTER COLUMN "id" SET DEFAULT nextval('"word_types_id_seq"')`,
    );
  }
}
