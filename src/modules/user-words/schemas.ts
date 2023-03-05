import { Word } from '@modules/words/entities';
import { IsBooleanString, IsEnumValue, IsNumericString } from 'src/validators';

import { ValidLearnBatchSizes } from './types';

export class CreateUserWordBodyDTO {
  @IsNumericString()
  wordId: Word['id'];
}

export class LearnWordsRequestQuery {
  @IsNumericString()
  @IsEnumValue(ValidLearnBatchSizes)
  batchSize: number;

  @IsBooleanString()
  allowPreviouslyShownWords: string;
}
