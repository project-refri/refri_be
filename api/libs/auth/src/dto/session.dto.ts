import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { SessionEntity } from '@app/auth/domain/session.entity';

export class SessionDto {
  @ApiProperty({ name: 'id' })
  @Expose({ name: 'id' })
  readonly id: number;
  @ApiProperty({ name: 'session_token' })
  @Expose({ name: 'session_token' })
  readonly sessionToken: string;
  @ApiProperty({ name: 'user_id' })
  @Expose({ name: 'user_id' })
  readonly userId: number;
  @ApiProperty({ name: 'created_at' })
  @Expose({ name: 'created_at' })
  readonly createdAt: Date;
  @ApiProperty({ name: 'updated_at' })
  @Expose({ name: 'updated_at' })
  readonly updatedAt: Date;

  constructor(
    id: number,
    sessionToken: string,
    userId: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.sessionToken = sessionToken;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromEntity(session: SessionEntity): SessionDto {
    return new SessionDto(
      session.id,
      session.sessionToken,
      session.userId,
      session.createdAt,
      session.updatedAt,
    );
  }
}
