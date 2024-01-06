import { TestBed } from '@automock/jest';
import { RecipeBookmarkController } from '@app/recipe/controllers/recipe-bookmark.controller';

describe('RecipeBookmarkController', () => {
  let controller: RecipeBookmarkController;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(
      RecipeBookmarkController,
    ).compile();

    controller = unit;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
