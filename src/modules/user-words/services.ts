import { ResourceNotFoundException } from '@errors/index';
import { User } from '@modules/users/entities';
import { UsersService } from '@modules/users/services';
import { Word } from '@modules/words/entities';
import { WordsService } from '@modules/words/services';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { shuffle, uniqBy } from 'lodash';
import { Repository } from 'typeorm';

import { UsersWords } from './entities';
import { ValidPracticeBatchSizes } from './types';
import { getPracticeWordsDistribution } from './utils';

@Injectable()
export class UsersWordsService {
  constructor(
    @InjectRepository(UsersWords)
    private usersWordsRepository: Repository<UsersWords>,
    private usersService: UsersService,
    private wordsService: WordsService,
  ) {}

  private async upsert(
    userId: User['id'],
    wordsId: Word['id'],
    notes?: string,
  ) {
    const user = await this.usersService.findByIdOrFail(userId);
    const word = await this.wordsService.findByIdOrFail(wordsId);

    await this.usersWordsRepository
      .createQueryBuilder()
      .insert()
      .into(UsersWords)
      .values({ user, word, notes })
      .orUpdate(['notes', 'updatedAt', 'deletedAt'], ['userId', 'wordId'])

      .execute();
  }

  private async findByUserIdAndWordId(userId: User['id'], wordId: Word['id']) {
    return await this.usersWordsRepository.findOne({
      where: { user: { id: userId }, word: { id: wordId } },
    });
  }

  private async getWordsNotPracticedRecently(
    userId: User['id'],
    itemsCount: number,
  ): Promise<UsersWords[]> {
    return await this.usersWordsRepository.find({
      where: { user: { id: userId } },
      order: { lastPracticedAt: 'ASC' },
      take: itemsCount,
    });
  }

  private async getWordsWithLowestScore(
    userId: User['id'],
    itemsCount: number,
  ): Promise<UsersWords[]> {
    // TODO probably should take into consideration failed/success ratio instead of absolute failed
    const query = this.usersWordsRepository
      .createQueryBuilder('uw')
      .leftJoinAndSelect('uw.word', 'word')
      .leftJoinAndSelect('word.verb', 'verb')
      .leftJoinAndSelect('word.noun', 'noun')
      .leftJoinAndSelect('word.englishTranslations', 'englishTranslations')
      .where('uw."userId" = :userId', { userId })
      .addSelect(
        'uw.failedPracticeCount - uw.successfulPracticeCount',
        'failedAttempts',
      )
      .distinctOn(['uw.id', 'uw.lastPracticedAt', '"failedAttempts"'])
      .orderBy('"failedAttempts"', 'DESC')
      .addOrderBy('uw.lastPracticedAt', 'ASC')
      .limit(itemsCount);

    return query.getMany();
  }

  private async getRandomWordsFromUserCollectionExcludingIds(
    userId: User['id'],
    itemsCount: number,
    ids: Word['id'][],
  ): Promise<UsersWords[]> {
    const query = this.usersWordsRepository
      .createQueryBuilder('uw')
      .leftJoinAndSelect('uw.word', 'word')
      .leftJoinAndSelect('word.verb', 'verb')
      .leftJoinAndSelect('word.noun', 'noun')
      .leftJoinAndSelect('word.englishTranslations', 'englishTranslations')
      .where('uw."userId" = :userId', { userId });

    if (ids.length > 0) {
      query.andWhere(`uw."wordId" NOT IN (${ids.join(',')})`);
    }

    const randomWords = await query.orderBy('RANDOM()').getMany();

    return randomWords.slice(0, itemsCount);
  }

  async findByUserIdAndWordIdOrFail(userId: User['id'], wordId: Word['id']) {
    const foundByUserIdAndWordId = await this.findByUserIdAndWordId(
      userId,
      wordId,
    );
    if (!foundByUserIdAndWordId) {
      throw new ResourceNotFoundException(
        UsersWords.name,
        { value: wordId, property: 'wordId' },
        { value: userId, property: 'userId' },
      );
    }
    return foundByUserIdAndWordId;
  }

  async addToCollection(
    userId: User['id'],
    wordId: Word['id'],
    notes?: string,
  ) {
    await this.upsert(userId, wordId, notes);
  }

  async removeFromCollection(userId: User['id'], wordId: Word['id']) {
    await this.usersWordsRepository.softDelete({
      word: { id: wordId },
      user: { id: userId },
    });
  }

  async getWordsForPractice(
    userId: User['id'],
    batchSize: ValidPracticeBatchSizes,
  ): Promise<UsersWords[]> {
    const practiceWordsDistribution = getPracticeWordsDistribution(batchSize);

    const wordsNotPracticedLately = await this.getWordsNotPracticedRecently(
      userId,
      practiceWordsDistribution.notPracticedRecently,
    );

    const wordsWithLowestScore = await this.getWordsWithLowestScore(
      userId,
      practiceWordsDistribution.lowScore,
    );

    const notPracticedLatelyAndLowestScoreWords = uniqBy(
      [...wordsNotPracticedLately, ...wordsWithLowestScore],
      'id',
    );
    const notPracticedLatelyAndLowestScoreWordsIds =
      notPracticedLatelyAndLowestScoreWords.map((it) => it.word.id);

    const randomWordsCount =
      batchSize - notPracticedLatelyAndLowestScoreWords.length;
    const randomWords = await this.getRandomWordsFromUserCollectionExcludingIds(
      userId,
      randomWordsCount,
      notPracticedLatelyAndLowestScoreWordsIds,
    );

    return shuffle([...notPracticedLatelyAndLowestScoreWords, ...randomWords]);
  }

  async submitPracticeResult(
    userId: User['id'],
    wordId: Word['id'],
    successful: boolean,
  ) {
    await this.findByUserIdAndWordIdOrFail(userId, wordId);

    const fieldToUpdate: keyof UsersWords = successful
      ? 'successfulPracticeCount'
      : 'failedPracticeCount';

    return await this.usersWordsRepository
      .createQueryBuilder()
      .update()
      .where(`"userId" = :userId`, { userId })
      .andWhere(`"wordId" = :wordId`, { wordId })
      .set({
        [fieldToUpdate]: () => `"${fieldToUpdate}" + 1`,
        lastPracticedAt: new Date(),
      })
      .execute();
  }
}
