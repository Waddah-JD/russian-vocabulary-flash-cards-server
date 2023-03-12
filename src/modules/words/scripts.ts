import { AppModule } from '@modules/app';
import { WordType } from '@modules/word-types/types';
import { NestFactory } from '@nestjs/core';
import { readSeedDataFile } from '@utils/files';
import * as yargs from 'yargs';

import {
  BaseCreateWordDto,
  CreateNounWordDto,
  CreateVerbWordDto,
} from './schemas';
import { WordsService } from './services';
import { CreateWordDTO } from './types';

yargs
  .command('seed', 'Seed Words', async () => {
    const app = await NestFactory.createApplicationContext(AppModule);
    const wordTypesService = app.get(WordsService);

    for (let i = 1; i < 5; i++) {
      const data = await readSeedDataFile<any>(`word_${i}`);

      for (const word of data) {
        let dto: CreateWordDTO;
        if (word.partOfSpeech === WordType.VERB) {
          dto = CreateVerbWordDto.fromRawSeedFormat(word);
        } else if (word.partOfSpeech === WordType.NOUN) {
          dto = CreateNounWordDto.fromRawSeedFormat(word);
        } else {
          dto = BaseCreateWordDto.fromRawSeedFormat(word);
        }

        try {
          await wordTypesService.create(dto);
        } catch (error) {
          console.error(error);
        }
      }
    }
    await app.close();
  })

  .command('seed-test-words', 'Seed Words for TESTS', async () => {
    const app = await NestFactory.createApplicationContext(AppModule);
    const wordTypesService = app.get(WordsService);

    const data = await readSeedDataFile<any>(`test`);

    for (const word of data) {
      let dto: CreateWordDTO;
      if (word.partOfSpeech === WordType.VERB) {
        dto = CreateVerbWordDto.fromRawSeedFormat(word);
      } else if (word.partOfSpeech === WordType.NOUN) {
        dto = CreateNounWordDto.fromRawSeedFormat(word);
      } else {
        dto = BaseCreateWordDto.fromRawSeedFormat(word);
      }

      try {
        await wordTypesService.create(dto);
      } catch (error) {
        console.error(error);
      }
    }
    await app.close();
  })

  .parse();
