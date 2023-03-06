import { IsOptional } from 'class-validator';
import { IsString } from 'src/validators';

export class AddWordToCollectionDTO {
  @IsOptional()
  @IsString()
  notes: string;
}
