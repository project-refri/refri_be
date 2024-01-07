import { IsInt, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '@app/user/dto/user.dto';

export class LoginSessionDto {
  @ApiProperty({ name: 'session_token' })
  @Expose({ name: 'session_token' })
  sessionToken: string;

  user: UserDto;
}

export class CreateSessionDto {
  @ApiProperty({ name: 'session_token' })
  @Expose({ name: 'session_token' })
  @IsUUID()
  sessionToken: string;

  @ApiProperty({ name: 'user_id' })
  @Expose({ name: 'user_id' })
  @IsInt()
  userId: number;
}
