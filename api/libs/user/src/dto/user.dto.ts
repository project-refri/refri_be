import { User } from '@app/user/domain/user.entity';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';
import { Diet } from '@app/user/domain/diet.enum';

export class UserDto {
  @ApiExpose({ name: 'id' })
  readonly id: number;

  readonly username: string;

  readonly email: string;

  readonly introduction: string;

  @ApiExpose({ name: 'diet', enum: Diet })
  readonly diet: Diet;

  readonly thumbnail: string;

  @ApiExpose({ name: 'created_at' })
  readonly createdAt: Date;

  @ApiExpose({ name: 'updated_at' })
  readonly updatedAt: Date;

  constructor(
    id: number,
    username: string,
    email: string,
    introduction: string,
    diet: Diet,
    thumbnail: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.introduction = introduction;
    this.diet = diet;
    this.thumbnail = thumbnail;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static from(user: User): UserDto {
    return new UserDto(
      user.id,
      user.username,
      user.email,
      user.introduction,
      user.diet,
      user.thumbnail,
      user.createdAt,
      user.updatedAt,
    );
  }
}
