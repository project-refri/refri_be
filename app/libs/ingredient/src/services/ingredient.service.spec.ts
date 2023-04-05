import { TestBed } from '@automock/jest';
import { IngredientService } from './ingredient.service';

describe('IngredientService', () => {
  let service: IngredientService;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(IngredientService).compile();

    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
