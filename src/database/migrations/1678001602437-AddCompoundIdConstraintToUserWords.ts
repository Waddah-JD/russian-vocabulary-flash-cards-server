import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCompoundIdConstraintToUserWords1678001602437
  implements MigrationInterface
{
  name = 'AddCompoundIdConstraintToUserWords1678001602437';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_words" ADD CONSTRAINT "user_id_word_id" UNIQUE ("userId", "wordId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_words" DROP CONSTRAINT "user_id_word_id"`,
    );
  }
}
