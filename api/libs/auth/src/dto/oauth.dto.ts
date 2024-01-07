import { IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '@app/user/dto/user.dto';

export class GoogleLoginDto {
  @ApiProperty({ name: 'access_token' })
  @Expose({ name: 'access_token' })
  @IsString()
  @IsNotEmpty()
  readonly accessToken: string;
}

export class KakaoLoginDto {
  @ApiProperty({ name: 'access_token' })
  @Expose({ name: 'access_token' })
  @IsString()
  @IsNotEmpty()
  readonly accessToken: string;
}

export class OAuthLoginSessionDto {
  @ApiProperty({ name: 'is_exist' })
  @Expose({ name: 'is_exist' })
  readonly isExist: boolean;

  @ApiProperty({ name: 'session_token' })
  @Expose({ name: 'session_token' })
  readonly sessionToken?: string;

  @ApiProperty({ name: 'user' })
  @Expose({ name: 'user' })
  readonly user?: UserDto;

  @ApiProperty({ name: 'register_token' })
  @Expose({ name: 'register_token' })
  readonly registerToken?: string;
}
