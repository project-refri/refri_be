/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Transform } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';

export class PagenationDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  page: number = 1;
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  limit: number = 1;

  constructor(page: number, limit: number) {
    this.page = page;
    this.limit = limit;
  }
}

export class PagenationResponseDto {
  public readonly page: number;
  public readonly count: number;

  @ApiExpose({ name: 'has_next' })
  public readonly hasNext: boolean;

  constructor(page: number, count: number, hasNext: boolean) {
    this.page = page;
    this.count = count;
    this.hasNext = hasNext;
  }
}
