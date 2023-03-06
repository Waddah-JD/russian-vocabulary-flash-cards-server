import {
  BaseCreateWordDto,
  CreateNounWordDto,
  CreateVerbWordDto,
} from './schemas';

export enum WordGender {
  MASCULINE = 'masculine',
  FEMININE = 'feminine',
  NEUTER = 'neuter',
}

export type CreateWordDTO =
  | BaseCreateWordDto
  | CreateNounWordDto
  | CreateVerbWordDto;

export enum ValidLearnBatchSizes {
  FIVE = '5',
  TEN = '10',
  FIFTEEN = '15',
  TWENTY = '20',
}
