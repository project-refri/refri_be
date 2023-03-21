import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsString } from 'class-validator';
import { Diet } from '../types/diet.enum';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  email: string;

  @IsString()
  introduction: string;

  @IsEnum(Diet)
  diet: Diet;
}
