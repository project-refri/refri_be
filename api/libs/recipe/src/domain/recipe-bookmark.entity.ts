import { Recipe, RecipeEntity } from './recipe.entity';
import { User, UserEntity } from '@app/user/domain/user.entity';
import { RecipeBookmark as RecipeBookmarkType } from '@prisma/client';
import { CreateRecipeBookmarkDto } from '@app/recipe/dto/recipe-bookmark/create-recipe-bookmark.dto';
import {
  RecipeNotExistsException,
  UserNotExistsException,
} from '@app/recipe/exception/domain.exception';
import { isNil } from '@nestjs/common/utils/shared.utils';

export class RecipeBookmarkEntity implements RecipeBookmarkType {
  public readonly id: number;
  public readonly recipeId: number;
  public readonly recipe?: RecipeEntity;
  public readonly userId: number;
  public readonly user?: UserEntity;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(props: {
    id: number;
    recipeId: number;
    recipe?: RecipeEntity;
    userId: number;
    user?: UserEntity;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = props.id;
    this.recipeId = props.recipeId;
    this.recipe = props.recipe;
    this.userId = props.userId;
    this.user = props.user;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static from(recipeBookmark: RecipeBookmark) {
    return new RecipeBookmarkEntity({
      id: recipeBookmark.id,
      recipeId: recipeBookmark.recipeId,
      recipe: recipeBookmark.recipe
        ? RecipeEntity.from(recipeBookmark.recipe)
        : undefined,
      userId: recipeBookmark.userId,
      user: recipeBookmark.user
        ? UserEntity.from(recipeBookmark.user)
        : undefined,
      createdAt: recipeBookmark.createdAt,
      updatedAt: recipeBookmark.updatedAt,
    });
  }
}

export class RecipeBookmark {
  constructor(props: {
    id: number;
    recipeId: number;
    recipe?: Recipe;
    userId: number;
    user?: User;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this._id = props.id;
    this._recipeId = props.recipeId;
    this._recipe = props.recipe;
    this._userId = props.userId;
    this._user = props.user;
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

  private _userId: number;

  get userId(): number {
    return this._userId;
  }

  private _user?: User;

  get user(): User {
    return this._user;
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
    dto: CreateRecipeBookmarkDto,
    recipe: RecipeEntity,
    user: UserEntity,
    dateTime: Date,
  ) {
    if (isNil(recipe)) {
      throw new RecipeNotExistsException();
    }
    if (isNil(user)) {
      throw new UserNotExistsException();
    }
    return new RecipeBookmark({
      id: null,
      recipeId: recipe.id,
      userId: user.id,
      createdAt: dateTime,
      updatedAt: dateTime,
    });
  }
}
