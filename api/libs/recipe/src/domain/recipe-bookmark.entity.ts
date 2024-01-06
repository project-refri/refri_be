import { RecipeBookmark as RecipeBookmarkType } from '@prisma/client';
import { Recipe } from './recipe.entity';
import { User } from '@app/user/domain/user.entity';

export class RecipeBookmark implements RecipeBookmarkType {
  id: number;
  recipeId: number;
  recipe: Recipe;
  userId: number;
  user: User;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: {
    id: number;
    recipeId: number;
    recipe: Recipe;
    userId: number;
    user: User;
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
}
