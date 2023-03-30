import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Diet } from '../types/diet.enum';

export class CreateUserApiDto {
  @IsString()
  username: string;
}

export class CreateUserDto extends CreateUserApiDto {
  @IsEmail()
  email: string;
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email', 'username'] as const),
) {
  @IsString()
  thumbnail: string;

  @IsString()
  introduction: string;

  @IsEnum(Diet)
  diet: Diet;
}
