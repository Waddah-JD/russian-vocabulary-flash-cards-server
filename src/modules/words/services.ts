import { EnglishTranslationsService } from '@modules/english-translations/services';
import { User } from '@modules/users/entities';
import { WordType } from '@modules/word-types/types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Noun, Verb, Word } from './entities';
import { CreateWordDTO } from './types';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(Word)
    private wordsRepository: Repository<Word>,
    @InjectRepository(Verb)
    private verbsRepository: Repository<Verb>,
    @InjectRepository(Noun)
    private nounsRepository: Repository<Noun>,
    private englishTranslationsService: EnglishTranslationsService,
  ) {}

  async create(word: CreateWordDTO) {
    const englishTranslationsEntities = [];
    for (const translation of word.englishTranslations) {
      englishTranslationsEntities.push(
        await this.englishTranslationsService.upsert(translation),
      );
    }

    const wordEntity = this.wordsRepository.create({
      ...word,
      englishTranslations: englishTranslationsEntities,
    });

    if (word.type === WordType.NOUN) {
      const nounEntity = this.nounsRepository.create(word);
      await this.nounsRepository.save(nounEntity);
      wordEntity.noun = nounEntity;
    }

    if (word.type === WordType.VERB) {
      const verbEntity = this.verbsRepository.create(word);
      await this.verbsRepository.save(verbEntity);
      wordEntity.verb = verbEntity;
    }

    await this.wordsRepository.save(wordEntity);
  }

  async findByIdOrFail(id: Word['id']) {
    // TODO add 404 support

    return await this.wordsRepository.findOneByOrFail({ id });
  }

  async getRandomWordsExcludingWordsInUserCollection(
    userId: User['id'],
    batchSize: number,
  ) {
    return await this.wordsRepository
      .createQueryBuilder('w')
      .where(
        `w.id NOT IN (SELECT uw."wordId" FROM users_words AS uw WHERE uw."userId" = :userId)`,
        { userId },
      )
      .limit(batchSize)
      .orderBy('RANDOM()')
      .leftJoinAndSelect('w.verb', 'verb')
      .leftJoinAndSelect('w.noun', 'noun')
      .leftJoinAndSelect('w.englishTranslations', 'englishTranslations')
      .getMany();
  }

  async getManyByIds(wordsIds: Word['id'][]) {
    return await this.wordsRepository.find({
      where: { id: In(wordsIds) },
    });
  }
}
