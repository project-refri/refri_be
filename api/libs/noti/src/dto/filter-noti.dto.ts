import { IsInt } from 'class-validator';

export class FilterNotiDto {
  @IsInt()
  user_id: number;
}
