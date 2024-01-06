import { TestBed } from '@automock/jest';
import { RecipeViewLogRepository } from '@app/recipe/repositories/recipe-view-log/mongo.recipe-view-log.repository';

describe('RecipeBookmarkRepository', () => {
  let repository: RecipeViewLogRepository;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(RecipeViewLogRepository).compile();

    repository = unit;
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
