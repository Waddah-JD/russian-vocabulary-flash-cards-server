import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceNotFoundException } from 'src/errors';
import { PaginatedSearchQueryResponse } from 'src/schemas/pagination';
import { Repository } from 'typeorm';

import { EnglishTranslation } from './entities';

@Injectable()
export class EnglishTranslationsService {
  constructor(
    @InjectRepository(EnglishTranslation)
    private englishTranslationRepository: Repository<EnglishTranslation>,
  ) {}

  private async create(translation: string) {
    return this.englishTranslationRepository.save(
      this.englishTranslationRepository.create({ translation }),
    );
  }

  private async findOneByValue(translation: string) {
    return await this.englishTranslationRepository.findOne({
      where: { translation },
    });
  }

  private async findOneById(id: EnglishTranslation['id']) {
    return await this.englishTranslationRepository
      .createQueryBuilder('et')
      .where(`et.id = :id`, { id })
      .leftJoinAndSelect('et.words', 'words')
      .getMany();
  }

  async findOneByIdOrFail(id: EnglishTranslation['id']) {
    const found = await this.findOneById(id);
    if (!found || found.length === 0) {
      throw new ResourceNotFoundException(EnglishTranslation.name, {
        value: id,
      });
    }

    return found[0];
  }

  async upsert(translation: string) {
    const found = await this.findOneByValue(translation);
    if (found) return found;

    return await this.create(translation);
  }

  async searchByWord(wordLike: string, limit?: number, skip?: number) {
    const query = this.englishTranslationRepository
      .createQueryBuilder('et')
      .where(`et.translation LIKE '${wordLike}%'`)
      .leftJoinAndSelect('et.words', 'words');

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
