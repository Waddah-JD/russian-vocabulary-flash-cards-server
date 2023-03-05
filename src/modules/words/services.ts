import { EnglishTranslationsService } from '@modules/english-translations/services';
import { WordType } from '@modules/word-types/types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';

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

  async getRandomWordsNotInIds(ids: Word['id'][], batchSize: number) {
    const randomIds = await this.wordsRepository
      .createQueryBuilder('w')
      .select('w.id')
      .orderBy('RANDOM()')
      .take(batchSize)
      .where({ id: Not(In(ids)) })
      .getMany();

    return this.wordsRepository.find({
      where: { id: In(randomIds.map(({ id }) => id)) },
    });
  }

  async getManyByIds(wordsIds: Word['id'][]) {
    return await this.wordsRepository.find({
      where: { id: In(wordsIds) },
    });
  }
}
