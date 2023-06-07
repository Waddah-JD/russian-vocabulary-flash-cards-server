import { ResourceNotFoundException } from '@errors/index';
import { EnglishTranslationsService } from '@modules/english-translations/services';
import { UsersWords } from '@modules/user-words/entities';
import { User } from '@modules/users/entities';
import { WordType } from '@modules/word-types/types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedSearchQueryResponse } from '@schemas/pagination';
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

  private getFindOneByIdQuery(id: Word['id'], userId?: User['id']) {
    const query = this.wordsRepository
      .createQueryBuilder('w')
      .where('w.id = :id', { id })
      .leftJoinAndSelect('w.verb', 'verb')
      .leftJoinAndSelect('w.noun', 'noun')
      .leftJoinAndSelect('w.englishTranslations', 'englishTranslations');

    if (userId) {
      query.leftJoinAndMapOne(
        'w.collectionEntry',
        UsersWords,
        'userWords',
        'userWords.user.id = :userId AND userWords.word.id = :id',
        { userId, id },
      );
    }

    return query;
  }

  private async getRandomWordsExcludingWordsIdsInUserCollection(
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
      .select('w.id')
      .getMany();
  }

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

  async findByIdOrFail(id: Word['id'], userId?: User['id']): Promise<Word> {
    const foundWord = await this.getFindOneByIdQuery(id, userId).getOne();
    if (!foundWord) {
      throw new ResourceNotFoundException(Word.name, { value: id });
    }
    return foundWord;
  }

  async getRandomWordsExcludingWordsInUserCollection(
    userId: User['id'],
    batchSize: number,
  ) {
    const ids = await this.getRandomWordsExcludingWordsIdsInUserCollection(
      userId,
      batchSize,
    );

    return await this.getManyByIds(ids.map(({ id }) => id));
  }

  async getManyByIds(wordsIds: Word['id'][]) {
    return await this.wordsRepository.find({
      where: { id: In(wordsIds) },
    });
  }

  async searchByWord(wordLike: string, limit?: number, skip?: number) {
    const query = this.wordsRepository
      .createQueryBuilder('w')
      .where(`w.word LIKE '${wordLike}%'`)
      .leftJoinAndSelect('w.verb', 'verb')
      .leftJoinAndSelect('w.noun', 'noun')
      .leftJoinAndSelect('w.englishTranslations', 'englishTranslations');

    if (limit) {
      query.take(limit);
    }

    if (skip) {
      query.skip(skip);
    }
    const manyAndCountTuple = await query.getManyAndCount();
    return new PaginatedSearchQueryResponse(manyAndCountTuple);
  }
}
