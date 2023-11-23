import { UserIngredient as UserIngredientType, $Enums } from '@prisma/client';

export class UserIngredient implements UserIngredientType {
  id: number;
  name: string;
  ingredient_id: number;
  user_id: number;
  food_type: $Enums.FoodType;
  store_method: $Enums.StoreMethod;
  count: number;
  days_before_expiration: number;
  icon: string;
  created_at: Date;
  updated_at: Date;
}
