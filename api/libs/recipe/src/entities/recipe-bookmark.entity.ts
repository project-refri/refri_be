import { RecipeBookmark as RecipeBookmarkType } from '@prisma/client';
import { Recipe } from './recipe.entity';
import { User } from '@app/user/entities/user.entity';

export class RecipeBookmark implements RecipeBookmarkType {
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

  id: number;
  recipeId: number;
  recipe: Recipe;
  userId: number;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
