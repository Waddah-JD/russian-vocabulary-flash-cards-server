import { AppModule } from '@modules/app';
import { NestFactory } from '@nestjs/core';
import { readSeedDataFile } from 'src/utils/files';
import * as yargs from 'yargs';

import { WordTypesService } from './services';

yargs
  .command('seed', 'Seed word types data', async () => {
    const app = await NestFactory.createApplicationContext(AppModule);
    const wordTypesService = app.get(WordTypesService);

    const data = await readSeedDataFile<{ id: number; type: string }[]>(
      'word_types',
    );

    for (const { id, type } of data) {
      await wordTypesService.create(id, type);
    }
    await app.close();
  })
  .parse();
