import { TestBed } from '@automock/jest';
import { RecipeController } from '@app/recipe/controllers/recipe.controller';

describe('RecipeController', () => {
  let controller: RecipeController;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(RecipeController).compile();

    controller = unit;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});