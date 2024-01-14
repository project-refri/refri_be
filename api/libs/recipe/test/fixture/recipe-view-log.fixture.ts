import { RecipeViewLogEntity } from '@app/recipe/domain/recipe-view-log.entity';
import { recipeEntity } from './recipe.fixture';
import { userEntity } from '../../../user/test/fixture/user.fixture';

export const recipeViewLogEntity: RecipeViewLogEntity = {
  id: 1,
  recipeId: recipeEntity.id,
  recipe: recipeEntity,
  userId: userEntity.id,
  user: userEntity,
  userIp: '::1',
  createdAt: new Date(),
  updatedAt: new Date(),
};
