import { RecipeService } from './recipe.service';
import { TestBed } from '@automock/jest';

describe('RecipeService', () => {
  let service: RecipeService;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(RecipeService).compile();

    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
