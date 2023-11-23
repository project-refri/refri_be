import { OmitType, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateNotiDto {
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class UpdateNotiDto extends PartialType(
  OmitType(CreateNotiDto, ['user_id'] as const),
) {}
