import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async upsert(translation: string) {
    const found = await this.findOneByValue(translation);
    if (found) return found;

    return await this.create(translation);
  }
}
