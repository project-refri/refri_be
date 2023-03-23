import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsString } from 'class-validator';
import { Diet } from '../types/diet.enum';

export class CreateUserDto {
  @IsString()
  nickname: string;

  @IsString()
  user_id: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  email: string;

  @IsString()
  introduction: string;

  @IsEnum(Diet)
  diet: Diet;
}
