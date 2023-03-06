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
}
