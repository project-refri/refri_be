/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Transform } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class PagenationDto {
  constructor(page: number, limit: number) {
    this.page = page;
    this.limit = limit;
  }
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  page: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  limit: number;
}

export class PagenationResponseDto {
  page: number;

  count: number;

  hasNext: boolean;
}
