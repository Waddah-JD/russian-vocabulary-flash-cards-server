import { Transform } from 'class-transformer';
import { IsEnumValue, IsNumber } from 'src/validators';

import { Noun, Verb, Word } from './entities';
import { ValidLearnBatchSizes, WordGender } from './types';

export class LearnWordsRequestQuery {
  @IsNumber()
  @IsEnumValue(ValidLearnBatchSizes)
  @Transform(({ value }) => +value)
  batchSize: ValidLearnBatchSizes;
}

function genderCodeToTypeMap(code: 'm' | 'f' | 'n'): WordGender | null {
  switch (code) {
    case 'm':
      return WordGender.MASCULINE;
    case 'f':
      return WordGender.FEMININE;
    case 'n':
      return WordGender.NEUTER;
    default:
      return null;
  }
}

interface RawWordSeedFileFormat {
  rank: number;
  word: string;
  accented: string | null;
  pronunciation: Word['pronunciation'];
  translations: string[];
  partOfSpeech: Word['type'];
  englishTranslations: string[];
}

interface RawNounSeedFileFormat extends RawWordSeedFileFormat {
  gender: 'm' | 'f';
  inanimate: boolean;
  declension: {
    nominative: { singular: string | null; plural: string | null };
    genitive: { singular: string | null; plural: string | null };
    dative: { singular: string | null; plural: string | null };
    accusative: { singular: string | null; plural: string | null };
    instrumental: { singular: string | null; plural: string | null };
    prepositional: { singular: string | null; plural: string | null };
  };
}

interface RawVerbSeedFileFormat extends RawWordSeedFileFormat {
  isImperfective: boolean | null;
  infinitive: string;
  conjugation: {
    past: {
      masculine: string | null;
      feminine: string | null;
      neuter: string | null;
      plural: string | null;
    };
    present: {
      singular1st: string | null;
      singular2nd: string | null;
      singular3rd: string | null;
      plural1st: string | null;
      plural2nd: string | null;
      plural3rd: string | null;
    };
    future: {
      singular1st: string | null;
      singular2nd: string | null;
      singular3rd: string | null;
      plural1st: string | null;
      plural2nd: string | null;
      plural3rd: string | null;
    };
    imperative: { singular: string | null; plural: string | null };
  };
}

export class BaseCreateWordDto {
  static fromRawSeedFormat(raw: RawWordSeedFileFormat): BaseCreateWordDto {
    const { rank, word, pronunciation, accented, partOfSpeech, translations } =
      raw;
    return {
      id: rank,
      word,
      pronunciation,
      accented: accented || word,
      type: partOfSpeech,
      englishTranslations: translations,
    };
  }

  id: Word['id'];
  word: Word['word'];
  pronunciation: Word['pronunciation'];
  accented: Word['accented'];
  type: Word['type'];
  englishTranslations: string[] | null;
}

export class CreateNounWordDto extends BaseCreateWordDto {
  static fromRawSeedFormat(raw: RawNounSeedFileFormat): CreateNounWordDto {
    const {
      rank,
      word,
      pronunciation,
      accented,
      partOfSpeech,
      translations,
      declension,
      gender,
      inanimate,
    } = raw;
    return {
      id: rank,
      word,
      pronunciation,
      accented: accented || word,
      type: partOfSpeech,
      englishTranslations: translations,
      gender: genderCodeToTypeMap(gender),
      isAnimate: !inanimate,
      declensionNominativeSingular: declension.nominative.singular,
      declensionNominativePlural: declension.nominative.plural,
      declensionGenitiveSingular: declension.genitive.singular,
      declensionGenitivePlural: declension.genitive.plural,
      declensionDativeSingular: declension.dative.singular,
      declensionDativePlural: declension.dative.plural,
      declensionAccusativeSingular: declension.accusative.singular,
      declensionAccusativePlural: declension.accusative.plural,
      declensionInstrumentalSingular: declension.instrumental.singular,
      declensionInstrumentalPlural: declension.instrumental.plural,
      declensionPrepositionalSingular: declension.prepositional.singular,
      declensionPrepositionalPlural: declension.prepositional.plural,
    };
  }

  gender: Noun['gender'];
  isAnimate: Noun['isAnimate'];
  declensionNominativeSingular: Noun['declensionNominativeSingular'];
  declensionNominativePlural: Noun['declensionNominativePlural'];
  declensionGenitiveSingular: Noun['declensionGenitiveSingular'];
  declensionGenitivePlural: Noun['declensionGenitivePlural'];
  declensionDativeSingular: Noun['declensionDativeSingular'];
  declensionDativePlural: Noun['declensionDativePlural'];
  declensionAccusativeSingular: Noun['declensionAccusativeSingular'];
  declensionAccusativePlural: Noun['declensionAccusativePlural'];
  declensionInstrumentalSingular: Noun['declensionInstrumentalSingular'];
  declensionInstrumentalPlural: Noun['declensionInstrumentalPlural'];
  declensionPrepositionalSingular: Noun['declensionPrepositionalSingular'];
  declensionPrepositionalPlural: Noun['declensionPrepositionalPlural'];
}

export class CreateVerbWordDto extends BaseCreateWordDto {
  static fromRawSeedFormat(raw: RawVerbSeedFileFormat): CreateVerbWordDto {
    const {
      rank,
      word,
      pronunciation,
      accented,
      partOfSpeech,
      translations,
      infinitive,
      isImperfective,
      conjugation,
    } = raw;
    return {
      id: rank,
      word,
      pronunciation,
      accented: accented || word,
      type: partOfSpeech,
      englishTranslations: translations,
      infinitive,
      isImperfective,
      conjugationPastMasculine: conjugation.past?.masculine,
      conjugationPastFeminine: conjugation.past?.feminine,
      conjugationPasNeuter: conjugation.past?.neuter,
      conjugationPastPlural: conjugation.past?.plural,
      conjugationPresentSingular1st: conjugation.present?.singular1st,
      conjugationPresentSingular2nd: conjugation.present?.singular2nd,
      conjugationPresentSingular3rd: conjugation.present?.singular3rd,
      conjugationPresentPlural1st: conjugation.present?.plural1st,
      conjugationPresentPlural2nd: conjugation.present?.plural2nd,
      conjugationPresentPlural3rd: conjugation.present?.plural3rd,
      conjugationFutureSingular1st: conjugation.future?.singular1st,
      conjugationFutureSingular2nd: conjugation.future?.singular2nd,
      conjugationFutureSingular3rd: conjugation.future?.singular3rd,
      conjugationFuturePlural1st: conjugation.future?.plural1st,
      conjugationFuturePlural2nd: conjugation.future?.plural2nd,
      conjugationFuturePlural3rd: conjugation.future?.plural3rd,
      conjugationImperativeSingular: conjugation.imperative?.singular,
      conjugationImperativePlural: conjugation.imperative?.plural,
    };
  }

  infinitive: Verb['infinitive'];
  isImperfective: Verb['isImperfective'];
  conjugationPastMasculine: Verb['conjugationPastMasculine'];
  conjugationPastFeminine: Verb['conjugationPastFeminine'];
  conjugationPasNeuter: Verb['conjugationPasNeuter'];
  conjugationPastPlural: Verb['conjugationPastPlural'];
  conjugationPresentSingular1st: Verb['conjugationPresentSingular1st'];
  conjugationPresentSingular2nd: Verb['conjugationPresentSingular2nd'];
  conjugationPresentSingular3rd: Verb['conjugationPresentSingular3rd'];
  conjugationPresentPlural1st: Verb['conjugationPresentPlural1st'];
  conjugationPresentPlural2nd: Verb['conjugationPresentPlural2nd'];
  conjugationPresentPlural3rd: Verb['conjugationPresentPlural3rd'];
  conjugationFutureSingular1st: Verb['conjugationFutureSingular1st'];
  conjugationFutureSingular2nd: Verb['conjugationFutureSingular2nd'];
  conjugationFutureSingular3rd: Verb['conjugationFutureSingular3rd'];
  conjugationFuturePlural1st: Verb['conjugationFuturePlural1st'];
  conjugationFuturePlural2nd: Verb['conjugationFuturePlural2nd'];
  conjugationFuturePlural3rd: Verb['conjugationFuturePlural3rd'];
  conjugationImperativeSingular: Verb['conjugationImperativeSingular'];
  conjugationImperativePlural: Verb['conjugationImperativePlural'];
}
