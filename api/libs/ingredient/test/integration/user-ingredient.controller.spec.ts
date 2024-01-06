import { TestBed } from '@automock/jest';
import { UserIngredientController } from '@app/ingredient/user-ingredient.controller';

describe('IngredientController', () => {
  let controller: UserIngredientController;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(
      UserIngredientController,
    ).compile();

    controller = unit;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
