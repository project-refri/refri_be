import { IsInt } from 'class-validator';

export class FilterNotiDto {
  @IsInt()
  userId: number;
}
