import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { IsNumericString, IsString } from 'src/validators';

export class PaginatedSearchQuery {
  @IsString()
  search: string;

  @IsOptional()
  @IsNumericString()
  page?: number;

  @IsOptional()
  @IsNumericString()
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
