import { TestBed } from '@automock/jest';
import { IngredientRepository } from './ingredient.repository';

describe('IngredientRepository', () => {
  let repository: IngredientRepository;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(IngredientRepository).compile();

    repository = unit;
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
