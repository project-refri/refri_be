import { TestBed } from '@automock/jest';
import { UserIngredientService } from './user-ingredient.service';

describe('IngredientService', () => {
  let service: UserIngredientService;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UserIngredientService).compile();

    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
