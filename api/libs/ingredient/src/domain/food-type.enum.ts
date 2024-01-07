export const FoodType = {
  PROTEIN: 'PROTEIN',
  VEGETABLE: 'VEGETABLE',
  CARBOHYDRATE: 'CARBOHYDRATE',
  FUNCTIONAL_FOOD: 'FUNCTIONAL_FOOD',
  ETC: 'ETC',
};

export type FoodType = (typeof FoodType)[keyof typeof FoodType];
