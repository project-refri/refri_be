import { User } from '@app/user/entities/user.entity';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class LoginTokensDto {
  access_token: string;

  refresh_token: string;
}

export class LoginTokenAndUserDto {
  token: LoginTokensDto;

  user: User;
}

export class RefreshDto {
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}

export class CreateRefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refresh_token: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  uuid: string;
}
