import { UserEntity } from '@app/user/domain/user.entity';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';
import { Diet } from '@app/user/domain/diet.enum';
import { Transform } from 'class-transformer';

export class UserDto {
  @ApiExpose({ name: 'id' })
  readonly id: number;

  readonly username: string;

  readonly email: string;

  readonly introduction: string;

  @ApiExpose({ name: 'diet', enum: Diet })
  readonly diet: Diet;

  readonly thumbnail: string;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
  @ApiExpose({ name: 'created_at' })
  readonly createdAt: Date;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
  @ApiExpose({ name: 'updated_at' })
  readonly updatedAt: Date;

  constructor(props: {
    id: number;
    username: string;
    email: string;
    introduction: string;
    diet: Diet;
    thumbnail: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = props.id;
    this.username = props.username;
    this.email = props.email;
    this.introduction = props.introduction;
    this.diet = props.diet;
    this.thumbnail = props.thumbnail;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static fromEntity(user: UserEntity): UserDto {
    return new UserDto({
      id: user.id,
      username: user.username,
      email: user.email,
      introduction: user.introduction,
      diet: user.diet,
      thumbnail: user.thumbnail,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
