import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWordTypes1677423724221 implements MigrationInterface {
  name = 'CreateWordTypes1677423724221';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "word_types" ("id" SERIAL NOT NULL, "type" character varying(100) NOT NULL, CONSTRAINT "PK_5bf5ca5cad7e26171e274ae795b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_de36e6f1e463de71dac56d4c4f" ON "word_types" ("type") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_de36e6f1e463de71dac56d4c4f"`,
    );
    await queryRunner.query(`DROP TABLE "word_types"`);
  }
}
