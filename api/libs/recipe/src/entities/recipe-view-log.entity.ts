import { RecipeViewLog as RecipeViewLogType } from '@prisma/client';

export class RecipeViewLog implements RecipeViewLogType {
  id: number;
  recipe_id: number;
  user_id: number;
  user_ip: string;
  created_at: Date;
  updated_at: Date;
}
