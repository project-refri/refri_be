import { Recipe as RecipeType } from '@prisma/client';

export class Recipe implements RecipeType {
  id: number;
  mongo_id: string;
  name: string;
  description: string;
  owner_id: number;
  thumbnail: string;
  origin_url: string;
  view_count: number;
  created_at: Date;
  updated_at: Date;
}
