import { UserIngredient as UserIngredientType, $Enums } from '@prisma/client';

export class UserIngredient implements UserIngredientType {
  id: number;
  name: string;
  ingredientId: number;
  userId: number;
  foodType: $Enums.FoodType;
  storeMethod: $Enums.StoreMethod;
  count: number;
  daysBeforeExpiration: number;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
}
