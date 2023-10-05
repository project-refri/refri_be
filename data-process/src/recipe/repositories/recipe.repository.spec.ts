import { TestBed } from '@automock/jest';
import { RecipeRepository } from './recipe.repository';

describe('RecipeRepository', () => {
  let repository: RecipeRepository;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(RecipeRepository).compile();

    repository = unit;
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
