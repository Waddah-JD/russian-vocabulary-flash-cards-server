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
