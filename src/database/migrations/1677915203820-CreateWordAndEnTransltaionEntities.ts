import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWordAndEnTransltaionEntities1677915203820
  implements MigrationInterface
{
  name = 'CreateWordAndEnTransltaionEntities1677915203820';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "english_translations" ("id" SERIAL NOT NULL, "translation" character varying(250) NOT NULL, CONSTRAINT "UQ_fc42be4c7ed1f4a8f9eb1c34fbf" UNIQUE ("translation"), CONSTRAINT "PK_dfb22e75cd95d1d22db106350ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fc42be4c7ed1f4a8f9eb1c34fb" ON "english_translations" ("translation") `,
    );
    await queryRunner.query(
      `CREATE TABLE "verbs" ("id" integer NOT NULL, "infinitive" character varying(100) NOT NULL, "isImperfective" boolean, "conjugationPastMasculine" character varying(100), "conjugationPastFeminine" character varying(100), "conjugationPasNeuter" character varying(100), "conjugationPastPlural" character varying(100), "conjugationPresentSingular1st" character varying(100), "conjugationPresentSingular2nd" character varying(100), "conjugationPresentSingular3rd" character varying(100), "conjugationPresentPlural1st" character varying(100), "conjugationPresentPlural2nd" character varying(100), "conjugationPresentPlural3rd" character varying(100), "conjugationFutureSingular1st" character varying(100), "conjugationFutureSingular2nd" character varying(100), "conjugationFutureSingular3rd" character varying(100), "conjugationFuturePlural1st" character varying(100), "conjugationFuturePlural2nd" character varying(100), "conjugationFuturePlural3rd" character varying(100), "conjugationImperativeSingular" character varying(100), "conjugationImperativePlural" character varying(100), CONSTRAINT "PK_caf3d34c2a9a5c24573205021e1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5284eb1d3b1079080f1fccc7ff" ON "verbs" ("infinitive") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_907887338543523076cde9c877" ON "verbs" ("isImperfective") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."nouns_gender_enum" AS ENUM('masculine', 'feminine', 'neuter')`,
    );
    await queryRunner.query(
      `CREATE TABLE "nouns" ("id" integer NOT NULL, "gender" "public"."nouns_gender_enum", "isAnimate" boolean NOT NULL, "declensionNominativeSingular" character varying(100), "declensionNominativePlural" character varying(100), "declensionGenitiveSingular" character varying(100), "declensionGenitivePlural" character varying(100), "declensionDativeSingular" character varying(100), "declensionDativePlural" character varying(100), "declensionAccusativeSingular" character varying(100), "declensionAccusativePlural" character varying(100), "declensionInstrumentalSingular" character varying(100), "declensionInstrumentalPlural" character varying(100), "declensionPrepositionalSingular" character varying(100), "declensionPrepositionalPlural" character varying(100), CONSTRAINT "PK_9165ce36aa35fd014fd7e7eec83" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_74603622d3d9ca57236b74db35" ON "nouns" ("gender") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_81489cb57687bb05b3fe946f04" ON "nouns" ("isAnimate") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."words_type_enum" AS ENUM('noun', 'verb', 'adjective', 'conjunction', 'adverb', 'preposition', 'particle', 'pronoun', 'interjection', 'numeral')`,
    );
    await queryRunner.query(
      `CREATE TABLE "words" ("id" integer NOT NULL, "word" character varying(100) NOT NULL, "pronunciation" character varying(100), "accented" character varying(100) NOT NULL, "type" "public"."words_type_enum", "nounId" integer, "verbId" integer, CONSTRAINT "REL_29497b55aeb2dc3051a5bcb8ad" UNIQUE ("nounId"), CONSTRAINT "REL_2bc59cbd8895ee56baef369920" UNIQUE ("verbId"), CONSTRAINT "PK_feaf97accb69a7f355fa6f58a3d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_38a98e41b6be0f379166dc2b58" ON "words" ("word") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ce34e1274b9b5ee13c6dcd1843" ON "words" ("type") `,
    );
    await queryRunner.query(
      `CREATE TABLE "words_english_translations" ("wordsId" integer NOT NULL, "englishTranslationsId" integer NOT NULL, CONSTRAINT "PK_8c857554309e05e30a3540e5f1c" PRIMARY KEY ("wordsId", "englishTranslationsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_087f12450b633a0574b7ae9d41" ON "words_english_translations" ("wordsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_13fe00df3074f53703c6047450" ON "words_english_translations" ("englishTranslationsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "words" ADD CONSTRAINT "FK_29497b55aeb2dc3051a5bcb8adf" FOREIGN KEY ("nounId") REFERENCES "nouns"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "words" ADD CONSTRAINT "FK_2bc59cbd8895ee56baef369920d" FOREIGN KEY ("verbId") REFERENCES "verbs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "words_english_translations" ADD CONSTRAINT "FK_087f12450b633a0574b7ae9d417" FOREIGN KEY ("wordsId") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "words_english_translations" ADD CONSTRAINT "FK_13fe00df3074f53703c6047450c" FOREIGN KEY ("englishTranslationsId") REFERENCES "english_translations"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "words_english_translations" DROP CONSTRAINT "FK_13fe00df3074f53703c6047450c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "words_english_translations" DROP CONSTRAINT "FK_087f12450b633a0574b7ae9d417"`,
    );
    await queryRunner.query(
      `ALTER TABLE "words" DROP CONSTRAINT "FK_2bc59cbd8895ee56baef369920d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "words" DROP CONSTRAINT "FK_29497b55aeb2dc3051a5bcb8adf"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_13fe00df3074f53703c6047450"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_087f12450b633a0574b7ae9d41"`,
    );
    await queryRunner.query(`DROP TABLE "words_english_translations"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ce34e1274b9b5ee13c6dcd1843"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_38a98e41b6be0f379166dc2b58"`,
    );
    await queryRunner.query(`DROP TABLE "words"`);
    await queryRunner.query(`DROP TYPE "public"."words_type_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_81489cb57687bb05b3fe946f04"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_74603622d3d9ca57236b74db35"`,
    );
    await queryRunner.query(`DROP TABLE "nouns"`);
    await queryRunner.query(`DROP TYPE "public"."nouns_gender_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_907887338543523076cde9c877"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5284eb1d3b1079080f1fccc7ff"`,
    );
    await queryRunner.query(`DROP TABLE "verbs"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fc42be4c7ed1f4a8f9eb1c34fb"`,
    );
    await queryRunner.query(`DROP TABLE "english_translations"`);
  }
}
