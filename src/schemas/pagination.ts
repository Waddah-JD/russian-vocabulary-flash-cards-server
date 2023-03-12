import { IsDependantOnProperty } from '@validators/dependant';
import { IsNumericString, IsString } from '@validators/index';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class PaginatedSearchQuery {
  @IsString()
  search: string;

  @IsOptional()
  @IsNumericString()
  @IsDependantOnProperty('perPage')
  page?: number;

  @IsOptional()
  @IsNumericString()
  @IsDependantOnProperty('page')
  perPage?: number;

  @Expose()
  get skip() {
    if (!this.page || !this.perPage) return;

    return (this.page - 1) * this.perPage;
  }
}

export class PaginatedSearchQueryResponse<T> {
  constructor(manyAndCountTuple: [T[], number]) {
    const [data, total] = manyAndCountTuple;
    this.data = data;
    this.total = total;
  }
  data: T[];
  total: number;
}
