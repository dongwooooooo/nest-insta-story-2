import { IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  limit?: number | 10;
  @IsOptional()
  offset: number | 0;
  @IsOptional()
  @IsString()
  sort?: string;
  @IsOptional()
  @IsString()
  order?: 'ASC' | 'DESC' = 'DESC';
}
