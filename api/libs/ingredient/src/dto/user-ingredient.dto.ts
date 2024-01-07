import { FoodType } from '@app/ingredient/domain/food-type.enum';
import { StoreMethod } from '@app/ingredient/domain/store-method.enum';
import { UserIngredient } from '@app/ingredient/domain/user-ingredient.entity';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';

export class UserIngredientDto {
  id: number;

  name: string;

  @ApiExpose({ name: 'ingredient_id' })
  ingredientId: number;

  @ApiExpose({ name: 'user_id' })
  userId: number;

  @ApiExpose({ name: 'food_type', enum: FoodType })
  foodType: FoodType;

  @ApiExpose({ name: 'store_method', enum: StoreMethod })
  storeMethod: StoreMethod;

  count: number;

  @ApiExpose({ name: 'days_before_expiration' })
  daysBeforeExpiration: number;

  icon: string;

  @ApiExpose({ name: 'created_at' })
  createdAt: Date;

  @ApiExpose({ name: 'updated_at' })
  updatedAt: Date;

  constructor(props: {
    id: number;
    name: string;
    ingredientId: number;
    userId: number;
    foodType: FoodType;
    storeMethod: StoreMethod;
    count: number;
    daysBeforeExpiration: number;
    icon: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.ingredientId = props.ingredientId;
    this.userId = props.userId;
    this.foodType = props.foodType;
    this.storeMethod = props.storeMethod;
    this.count = props.count;
    this.daysBeforeExpiration = props.daysBeforeExpiration;
    this.icon = props.icon;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static from(userIngredient: UserIngredient) {
    return new UserIngredientDto({
      id: userIngredient.id,
      name: userIngredient.name,
      ingredientId: userIngredient.ingredientId,
      userId: userIngredient.userId,
      foodType: userIngredient.foodType,
      storeMethod: userIngredient.storeMethod,
      count: userIngredient.count,
      daysBeforeExpiration: userIngredient.daysBeforeExpiration,
      icon: userIngredient.icon,
      createdAt: userIngredient.createdAt,
      updatedAt: userIngredient.updatedAt,
    });
  }
}
