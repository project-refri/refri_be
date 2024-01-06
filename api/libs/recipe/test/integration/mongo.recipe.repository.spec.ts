import { TestBed } from '@automock/jest';
import { MongoRecipeRepository } from '@app/recipe/repositories/recipe/mongo.recipe.repository';

describe('RecipeRepository', () => {
  let repository: MongoRecipeRepository;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MongoRecipeRepository).compile();

    repository = unit;
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
