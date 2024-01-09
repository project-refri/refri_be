import { User, UserEntity } from '@app/user/domain/user.entity';
import { Recipe, RecipeEntity } from './recipe.entity';
import { RecipeViewLog as RecipeViewLogType } from '@prisma/client';
import { CreateRecipeViewLogDto } from '@app/recipe/dto/recipe-view-log/create-recipe-view-log.dto';
import {
  RecipeNotExistsException,
  UserNotExistsException,
} from '@app/recipe/exception/domain.exception';
import { isNil } from '@nestjs/common/utils/shared.utils';

export class RecipeViewLogEntity implements RecipeViewLogType {
  public readonly id: number;
  public readonly recipeId: number;
  public readonly recipe?: RecipeEntity;
  public readonly userId: number | null;
  public readonly user?: UserEntity;
  public readonly userIp: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(props: {
    id: number;
    recipeId: number;
    recipe?: RecipeEntity;
    userId?: number;
    user?: UserEntity;
    userIp: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = props.id;
    this.recipeId = props.recipeId;
    this.recipe = props.recipe;
    this.userId = props.userId;
    this.user = props.user;
    this.userIp = props.userIp;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static from(recipeViewLog: RecipeViewLog) {
    return new RecipeViewLogEntity({
      id: recipeViewLog.id,
      recipeId: recipeViewLog.recipeId,
      recipe: recipeViewLog.recipe
        ? RecipeEntity.from(recipeViewLog.recipe)
        : undefined,
      userId: recipeViewLog.userId,
      user: recipeViewLog.user
        ? UserEntity.from(recipeViewLog.user)
        : undefined,
      userIp: recipeViewLog.userIp,
      createdAt: recipeViewLog.createdAt,
      updatedAt: recipeViewLog.updatedAt,
    });
  }
}

export class RecipeViewLog {
  constructor(props: {
    id: number;
    recipeId: number;
    recipe?: Recipe;
    userId?: number;
    user?: User;
    userIp: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this._id = props.id;
    this._recipeId = props.recipeId;
    this._recipe = props.recipe;
    this._userId = props.userId;
    this._user = props.user;
    this._userIp = props.userIp;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  private _id: number;

  get id(): number {
    return this._id;
  }

  private _recipeId: number;

  get recipeId(): number {
    return this._recipeId;
  }

  private _recipe?: Recipe;

  get recipe(): Recipe {
    return this._recipe;
  }

  private _userId?: number;

  get userId(): number {
    return this._userId;
  }

  private _user?: User | null;

  get user(): User {
    return this._user;
  }

  private _userIp: string;

  get userIp(): string {
    return this._userIp;
  }

  private _createdAt: Date;

  get createdAt(): Date {
    return this._createdAt;
  }

  private _updatedAt: Date;

  get updatedAt(): Date {
    return this._updatedAt;
  }

  static create(
    dto: CreateRecipeViewLogDto,
    recipe: RecipeEntity,
    user: UserEntity | null,
    datetime: Date,
  ) {
    if (isNil(recipe)) {
      throw new RecipeNotExistsException();
    }
    if (isNil(user) && isNil(dto.userIp)) {
      throw new UserNotExistsException();
    }
    return new RecipeViewLog({
      id: null,
      recipeId: recipe.id,
      userId: user?.id,
      userIp: dto.userIp,
      createdAt: datetime,
      updatedAt: datetime,
    });
  }
}
