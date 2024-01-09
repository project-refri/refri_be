import { Diet } from '@app/user/domain/diet.enum';
import { $Enums, User as UserType } from '@prisma/client';
import { CreateUserDto } from '@app/user/dto/modify-user.dto';

export class UserEntity implements UserType {
  public readonly id: number;
  public readonly username: string;
  public readonly email: string;
  public readonly introduction: string;
  public readonly diet: $Enums.Diet;
  public readonly thumbnail: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(props: {
    id: number;
    username: string;
    email: string;
    introduction: string;
    diet: $Enums.Diet;
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

  static from(user: User) {
    return new UserEntity({
      id: user.id,
      username: user.username,
      email: user.email,
      introduction: user.introduction,
      diet: $Enums.Diet[user.diet],
      thumbnail: user.thumbnail,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}

export class User {
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
    this._id = props.id;
    this._username = props.username;
    this._email = props.email;
    this._introduction = props.introduction;
    this._diet = props.diet;
    this._thumbnail = props.thumbnail;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  private _id: number;

  get id(): number {
    return this._id;
  }

  private _username: string;

  get username(): string {
    return this._username;
  }

  private _email: string;

  get email(): string {
    return this._email;
  }

  private _introduction: string;

  get introduction(): string {
    return this._introduction;
  }

  private _diet: Diet;

  get diet(): Diet {
    return this._diet;
  }

  private _thumbnail: string;

  get thumbnail(): string {
    return this._thumbnail;
  }

  private _createdAt: Date;

  get createdAt(): Date {
    return this._createdAt;
  }

  private _updatedAt: Date;

  get updatedAt(): Date {
    return this._updatedAt;
  }

  static create(dto: CreateUserDto, datetime: Date) {
    return new User({
      id: null,
      username: dto.username,
      email: dto.email,
      introduction: '자기소개입니다.',
      diet: Diet.NORMAL,
      thumbnail: dto.thumbnail,
      createdAt: datetime,
      updatedAt: datetime,
    });
  }
}
