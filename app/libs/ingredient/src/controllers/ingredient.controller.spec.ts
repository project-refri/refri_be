import { TestBed } from '@automock/jest';
import { IngredientController } from './ingredient.controller';

describe('IngredientController', () => {
  let controller: IngredientController;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(IngredientController).compile();

    controller = unit;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
