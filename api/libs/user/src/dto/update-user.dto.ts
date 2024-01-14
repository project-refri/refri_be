import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { Diet } from '@app/user/domain/diet.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsUrl()
  thumbnail?: string;

  @IsOptional()
  @IsString()
  introduction?: string;

  @IsOptional()
  @IsEnum(Diet)
  diet?: Diet;
}
