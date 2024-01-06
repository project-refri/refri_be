import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { Diet } from '../domain/diet.enum';

export class CreateUserApiDto {
  @IsString()
  username: string;
}

export class CreateUserDto extends CreateUserApiDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsUrl()
  thumbnail?: string;
}

class UpdateAdditionalDto {
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
