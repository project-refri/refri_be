import { Ingredient as IngredientType } from '@prisma/client';

export class Ingredient implements IngredientType {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  icon: string;
  created_at: Date;
  updated_at: Date;
}
