import { IsMongoId } from 'class-validator';

export class FilterNotiDto {
  @IsMongoId()
  user_id: string;
}
