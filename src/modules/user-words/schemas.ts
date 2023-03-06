import { IsOptional } from 'class-validator';
import { IsEnumValue, IsNumericString, IsString } from 'src/validators';

import { ValidLearnBatchSizes } from './types';

export class LearnWordsRequestQuery {
  @IsNumericString()
  @IsEnumValue(ValidLearnBatchSizes)
  batchSize: number;
}

export class AddWordToCollectionDTO {
  @IsOptional()
  @IsString()
  notes: string;
}
