import { CommonService } from '@app/common/common.service';
import { Injectable } from '@nestjs/common';
import { FilterIngredientDto } from '../dto/filter-ingredient.dto';
import { CreateIngredientDto } from '../dto/modify-ingredient.dto';
import { Ingredient } from '../entities/ingredient.entity';
import { IngredientRepository } from '../repositories/ingredient.repository';

@Injectable()
export class IngredientService extends CommonService<
  Ingredient,
  CreateIngredientDto,
  any,
  FilterIngredientDto
> {
  constructor(private readonly ingredientRepository: IngredientRepository) {
    super(ingredientRepository);
  }
}
