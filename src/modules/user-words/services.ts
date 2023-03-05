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

  async findByIdOrFail(userId: User['id'], wordId: Word['id']) {
    try {
      return await this.usersWordsRepository.findOneOrFail({
        where: { user: { id: userId }, word: { id: wordId } },
      });
    } catch (error) {
      throw new ResourceNotFoundException(
        UsersWords.name,
        { value: wordId, property: 'wordId' },
        { value: userId, property: 'usereId' },
      );
    }
  }
}
