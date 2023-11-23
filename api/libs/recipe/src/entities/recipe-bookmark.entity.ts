import { RecipeBookmark as RecipeBookmarkType } from '@prisma/client';

export class RecipeBookmark implements RecipeBookmarkType {
  id: number;
  recipe_id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}
