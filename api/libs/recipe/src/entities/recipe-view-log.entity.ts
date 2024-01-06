import { User } from '@app/user/entities/user.entity';
import { RecipeViewLog as RecipeViewLogType } from '@prisma/client';
import { Recipe } from './recipe.entity';

export class RecipeViewLog implements RecipeViewLogType {
  constructor(props: {
    id: number;
    recipeId: number;
    recipe: Recipe;
    userId: number;
    user: User;
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

  id: number;
  recipeId: number;
  recipe?: Recipe;
  userId: number;
  user?: User | null;
  userIp: string;
  createdAt: Date;
  updatedAt: Date;
}
