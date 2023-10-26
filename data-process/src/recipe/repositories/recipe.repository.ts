import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilterRecipeDto, RecipesAndCountDto } from '../dto/filter-recipe.dto';
import { CreateRecipeDto, UpdateRecipeDto } from '../dto/modify-recipe.dto';
import { Recipe, RecipeDocument } from '../entities/recipe.entity';

export function deleteNull(obj: any) {
  for (const prop in obj) {
    if (obj[prop] === null || obj[prop] === undefined) {
      delete obj[prop];
    }
  }
}

@Injectable()
export class RecipeRepository {
  constructor(
    @InjectModel(Recipe.name)
    private readonly recipeModel: Model<RecipeDocument>,
  ) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const createdEntity = new this.recipeModel(createRecipeDto);
    return await createdEntity.save();
  }

  async findAll(
    _filterRecipeDto: FilterRecipeDto,
  ): Promise<RecipesAndCountDto> {
    const filterRecipeDto = { ..._filterRecipeDto };
    deleteNull(filterRecipeDto);

    const page = filterRecipeDto.page,
      limit = filterRecipeDto.limit;
    delete filterRecipeDto.page;
    delete filterRecipeDto.limit;
    const filteredPipe = this.recipeModel
      .aggregate()
      .match(filterRecipeDto)
      .project({
        _id: 0,
        __v: 0,
        // recipe_raw_text: 0,
        // origin_url: 0,
        // recipe_steps: 0,
        // ingredient_requirements: 0,
      })
      .pipeline();
    const countPromise = this.recipeModel
      .aggregate(filteredPipe)
      .count('count');
    const recipeAggrPipe = this.recipeModel
      .aggregate(filteredPipe)
      .sort({ created_at: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const [recipes, count] = await Promise.all([
      recipeAggrPipe.exec(),
      countPromise.exec(),
    ]);
    return new RecipesAndCountDto(
      recipes,
      count.length > 0 ? count[0].count : 0,
    );
  }

  async findOneByOriginUrl(originUrl: string) {
    return await this.recipeModel.findOne({ origin_url: originUrl }).exec();
  }

  async findOne(id: string): Promise<Recipe> {
    return await this.recipeModel
      .findOne({ id })
      .select({
        _id: 0,
        __v: 0,
        recipe_raw_text: 0,
      })
      .exec();
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    return await this.recipeModel
      .findOneAndUpdate({ id }, updateRecipeDto, { new: true })
      .exec();
  }

  async deleteOne(id: string): Promise<Recipe> {
    return await this.recipeModel.findOneAndDelete({ id }).exec();
  }

  async deleteAll(filterRecipeDto: FilterRecipeDto): Promise<any> {
    deleteNull(filterRecipeDto);
    delete filterRecipeDto.page;
    delete filterRecipeDto.limit;
    return await this.recipeModel.deleteMany(filterRecipeDto).exec();
  }
}
