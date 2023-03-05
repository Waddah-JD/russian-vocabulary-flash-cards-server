import { User } from '@modules/users/entities';
import { UsersService } from '@modules/users/services';
import { Word } from '@modules/words/entities';
import { WordsService } from '@modules/words/services';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceNotFoundException } from 'src/errors';
import { Repository } from 'typeorm';

import { UsersWords } from './entities';

@Injectable()
export class UsersWordsService {
  constructor(
    @InjectRepository(UsersWords)
    private readonly usersWordsRepository: Repository<UsersWords>,
    private readonly usersService: UsersService,
    private readonly wordsService: WordsService,
  ) {}

  async create(userId: User['id'], wordId: Word['id']) {
    const user = await this.usersService.findByIdOrFail(userId);
    const word = await this.wordsService.findByIdOrFail(wordId);

    await this.usersWordsRepository.save(
      this.usersWordsRepository.create({ user, word }),
    );
  }

  private async createMany(userId: User['id'], wordsIds: Word['id'][]) {
    const user = await this.usersService.findByIdOrFail(userId);
    const words = await this.wordsService.getManyByIds(wordsIds);

    const entries = words.map((word) => {
      return { word, user };
    });

    await this.usersWordsRepository
      .createQueryBuilder()
      .insert()
      .into(UsersWords)
      .values(entries)
      .execute();
  }

  private async getWordsPreviouslyShownToUser(
    userId: User['id'],
    onlyInCollection: boolean,
  ) {
    const query = this.usersWordsRepository
      .createQueryBuilder('uw')
      .leftJoinAndSelect('uw.word', 'word')
      .where('uw.userId = :userId', { userId });

    if (onlyInCollection) {
      query.andWhere('uw.addedToCollectionAt IS NOT NULL');
    }

    return query.getMany();
  }

  async getWordsForLearning(
    userId: User['id'],
    batchSize: number,
    allowPreviouslyShownWords: boolean,
  ) {
    const wordsPreviouslyShownToUser = await this.getWordsPreviouslyShownToUser(
      userId,
      !allowPreviouslyShownWords,
    );
    const ids = wordsPreviouslyShownToUser.map((userWord) => userWord.word.id);

    const randomWords = await this.wordsService.getRandomWordsNotInIds(
      ids,
      batchSize,
    );
    const randomWordsIds = randomWords.map(({ id }) => id);

    await this.createMany(userId, randomWordsIds);

    return randomWords;
  }

  async findByIdOrFail(userId: User['id'], wordId: Word['id']) {
    try {
      return await this.usersWordsRepository.findOneOrFail({
        where: { user: { id: userId }, word: { id: wordId } },
      });
    } catch (error) {
      throw new ResourceNotFoundException(
        UsersWords.name,
        { value: wordId, property: 'wordId' },
        { value: userId, property: 'userId' },
      );
    }
  }
}
