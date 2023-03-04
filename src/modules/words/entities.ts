import { EnglishTranslation } from '@modules/english-translations/entities';
import { WordType } from '@modules/word-types/types';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

import { WordGender } from './types';

@Entity({ name: 'verbs' })
export class Verb {
  @PrimaryColumn('int')
  id: number;

  @Column({ type: 'varchar', length: 100 })
  @Index()
  infinitive: string;

  @Column({ type: 'boolean', nullable: true })
  @Index()
  isImperfective: boolean | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  conjugationPastMasculine: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  conjugationPastFeminine: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  conjugationPasNeuter: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  conjugationPastPlural: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  conjugationPresentSingular1st: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  conjugationPresentSingular2nd: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  conjugationPresentSingular3rd: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  conjugationPresentPlural1st: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  conjugationPresentPlural2nd: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  conjugationPresentPlural3rd: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  conjugationFutureSingular1st: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  conjugationFutureSingular2nd: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  conjugationFutureSingular3rd: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  conjugationFuturePlural1st: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  conjugationFuturePlural2nd: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  conjugationFuturePlural3rd: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  conjugationImperativeSingular: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  conjugationImperativePlural: string | null;
}

@Entity({ name: 'nouns' })
export class Noun {
  @PrimaryColumn('int')
  id: number;

  @Column({ type: 'enum', enum: WordGender, nullable: true })
  @Index()
  gender: WordGender | null;

  @Column({ type: 'boolean' })
  @Index()
  isAnimate: boolean;

  @Column({ type: 'varchar', length: 100, nullable: true })
  declensionNominativeSingular: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  declensionNominativePlural: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  declensionGenitiveSingular: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  declensionGenitivePlural: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  declensionDativeSingular: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  declensionDativePlural: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  declensionAccusativeSingular: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  declensionAccusativePlural: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  declensionInstrumentalSingular: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  declensionInstrumentalPlural: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  declensionPrepositionalSingular: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  declensionPrepositionalPlural: string | null;
}

@Entity({ name: 'words' })
export class Word {
  @PrimaryColumn('int')
  id: number;

  @Column({ type: 'varchar', length: 100 })
  @Index()
  word: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  pronunciation: string | null;

  @Column({ type: 'varchar', length: 100 })
  accented: string;

  @Column({ type: 'enum', enum: WordType, nullable: true })
  @Index()
  type: WordType | null;

  @OneToOne(() => Noun, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  noun: Noun;

  @OneToOne(() => Verb, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  verb: Verb;

  @ManyToMany(() => EnglishTranslation, { eager: true, onDelete: 'CASCADE' })
  @JoinTable({ name: 'words_english_translations' })
  englishTranslations: EnglishTranslation[];
}
