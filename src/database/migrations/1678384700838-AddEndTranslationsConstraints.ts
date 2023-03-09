import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEndTranslationsConstraints1678384700838
  implements MigrationInterface
{
  name = 'AddEndTranslationsConstraints1678384700838';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "words_english_translations" DROP CONSTRAINT "FK_13fe00df3074f53703c6047450c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "words_english_translations" ADD CONSTRAINT "FK_13fe00df3074f53703c6047450c" FOREIGN KEY ("englishTranslationsId") REFERENCES "english_translations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "words_english_translations" DROP CONSTRAINT "FK_13fe00df3074f53703c6047450c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "words_english_translations" ADD CONSTRAINT "FK_13fe00df3074f53703c6047450c" FOREIGN KEY ("englishTranslationsId") REFERENCES "english_translations"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
