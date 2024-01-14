import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

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
