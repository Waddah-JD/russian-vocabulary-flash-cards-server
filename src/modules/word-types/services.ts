import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WordType } from './entities';

@Injectable()
export class WordTypesService {
  constructor(
    @InjectRepository(WordType)
    private wordTypesRepository: Repository<WordType>,
  ) {}

  async create(type: string) {
    await this.wordTypesRepository.save(
      this.wordTypesRepository.create({ type }),
    );
  }
}
