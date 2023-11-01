import { TestBed } from '@automock/jest';
import { RecipeBookmarkRepository } from './recipe-bookmark.repository';

describe('RecipeBookmarkRepository', () => {
  let repository: RecipeBookmarkRepository;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(
      RecipeBookmarkRepository,
    ).compile();

    repository = unit;
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
