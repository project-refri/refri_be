import { Recipe } from './recipe.entity';
import { User } from '@app/user/domain/user.entity';

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
}
