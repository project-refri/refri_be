import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
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

class UpdateAdditionalDto {
  @IsString()
  thumbnail: string;

  @IsString()
  introduction: string;

  @IsEnum(Diet)
  diet: Diet;
}

export class UpdateUserDto extends PartialType(
  OmitType(IntersectionType(CreateUserDto, UpdateAdditionalDto), [
    'email',
  ] as const),
) {}
