import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Diet } from '../types/diet.enum';

export class CreateUserApiDto {
  @IsString()
  nickname: string;

  @IsString()
  username: string;
}

export class CreateUserDto {
  @IsString()
  nickname: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  introduction: string;

  @IsEnum(Diet)
  diet: Diet;
}
