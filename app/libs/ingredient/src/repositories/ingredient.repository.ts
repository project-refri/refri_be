import { CommonRepository } from '@app/common/common.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilterIngredientDto } from '../dto/filter-ingredient.dto';
import { CreateIngredientDto } from '../dto/modify-ingredient.dto';
import { Ingredient, IngredientDocument } from '../entities/ingredient.entity';

@Injectable()
export class IngredientRepository extends CommonRepository<
  Ingredient,
  CreateIngredientDto,
  any,
  FilterIngredientDto
> {
  constructor(
    @InjectModel(Ingredient.name)
    private readonly ingredientModel: Model<IngredientDocument>,
  ) {
    super(ingredientModel);
  }
}
