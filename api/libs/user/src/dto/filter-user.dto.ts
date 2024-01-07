import { Diet } from '../domain/diet.enum';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class FilterUserDto {
  @IsString()
  @IsNotEmpty()
  nickname?: string;

  @ApiExpose({ name: 'user_id' })
  userId?: string;

  @IsEmail()
  email?: string;

  @IsEnum(Diet)
  diet?: Diet;
}
