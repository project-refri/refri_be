import { RecipeCacheable } from '@app/common/cache/decorators/cache.decorator';
import { QueryType } from '@app/common/cache/types/query.type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilterRecipeDto } from '../dto/filter-recipe.dto';
import { CreateRecipeDto, UpdateRecipeDto } from '../dto/modify-recipe.dto';
import { Recipe, RecipeDocument } from '../entities/recipe.entity';

@Injectable()
export class RecipeRepository {
  constructor(
    @InjectModel(Recipe.name)
    private readonly recipeModel: Model<RecipeDocument>,
  ) {}

  @RecipeCacheable({
    action: QueryType.MODIFY_MANY,
    keyIdx: null,
  })
  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const createdEntity = new this.recipeModel(createRecipeDto);
    return await createdEntity.save();
  }

  @RecipeCacheable({
    action: QueryType.FIND_MANY,
    keyIdx: 0,
  })
  async findAll(filterRecipeDto: FilterRecipeDto): Promise<Recipe[]> {
    return await this.recipeModel.find(filterRecipeDto).exec();
  }

  @RecipeCacheable({
    action: QueryType.FIND_ONE,
    keyIdx: 0,
  })
  async findOne(id: string): Promise<Recipe> {
    return await this.recipeModel.findOne({ id }).exec();
  }

  @RecipeCacheable({
    action: QueryType.MODIFY_ONE,
    keyIdx: 0,
  })
  async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    return await this.recipeModel
      .findOneAndUpdate({ id }, updateRecipeDto, { new: true })
      .exec();
  }

  @RecipeCacheable({
    action: QueryType.MODIFY_ONE,
    keyIdx: 0,
  })
  async deleteOne(id: string): Promise<Recipe> {
    return await this.recipeModel.findOneAndDelete({ id }).exec();
  }

  @RecipeCacheable({
    action: QueryType.MODIFY_MANY,
    keyIdx: null,
  })
  async deleteAll(filterRecipeDto: FilterRecipeDto): Promise<any> {
    return await this.recipeModel.deleteMany(filterRecipeDto).exec();
  }
}
