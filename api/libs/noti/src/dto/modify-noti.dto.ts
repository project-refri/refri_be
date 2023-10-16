import { OmitType, PartialType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateNotiDto {
  @IsMongoId()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class UpdateNotiDto extends PartialType(
  OmitType(CreateNotiDto, ['user_id'] as const),
) {}
