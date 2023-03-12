import { IsBoolean, IsEnumValue, IsNumber, IsString } from '@validators/index';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { ValidPracticeBatchSizes } from './types';

export class AddWordToCollectionDTO {
  @IsOptional()
  @IsString()
  notes: string;
}

export class PracticeWordsRequestQuery {
  @IsNumber()
  @IsEnumValue(ValidPracticeBatchSizes)
  @Transform(({ value }) => +value)
  batchSize: ValidPracticeBatchSizes;
}

export class PracticeWordResult {
  @IsBoolean()
  successful: boolean;
}
