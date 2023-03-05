import { IsOptional } from 'class-validator';
import {
  IsBooleanString,
  IsEnumValue,
  IsNumericString,
  IsString,
} from 'src/validators';

import { ValidLearnBatchSizes } from './types';

export class LearnWordsRequestQuery {
  @IsNumericString()
  @IsEnumValue(ValidLearnBatchSizes)
  batchSize: number;

  @IsBooleanString()
  allowPreviouslyShownWords: string;
}

export class AddWordToCollectionDTO {
  @IsOptional()
  @IsString()
  notes: string;
}
