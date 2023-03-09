import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { IsBoolean, IsEnumValue, IsNumber, IsString } from 'src/validators';

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
