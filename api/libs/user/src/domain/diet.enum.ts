export const Diet = {
  NORMAL: 'NORMAL',
  DIET: 'DIET',
  VEGAN: 'VEGAN',
  KETO: 'KETO',
  WORKOUT: 'WORKOUT',
};

export type Diet = (typeof Diet)[keyof typeof Diet];
