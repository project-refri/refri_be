import { TestBed } from '@automock/jest';
import { UserIngredientRepository } from '@app/ingredient/repositories/mongo.user-ingredient.repository';

describe('IngredientRepository', () => {
  let repository: UserIngredientRepository;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(
      UserIngredientRepository,
    ).compile();

    repository = unit;
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
