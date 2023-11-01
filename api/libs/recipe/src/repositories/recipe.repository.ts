import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  FilterRecipeDto,
  RecipeDto,
  RecipeListViewResponseDto,
  RecipesAndCountDto,
  TextSearchRecipeDto,
  TextSearchSortBy,
} from '../dto/filter-recipe.dto';
import { CreateRecipeDto, UpdateRecipeDto } from '../dto/modify-recipe.dto';
import { Recipe, RecipeDocument } from '../entities/recipe.entity';
import { deleteNull } from '@app/common/utils/delete-null';
import { deleteProps } from '@app/common/utils/delete-props';
import { inspect } from '@app/common/utils/inpect';

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

  async findAll(filterRecipeDto: FilterRecipeDto): Promise<RecipesAndCountDto> {
    const { page, limit } = filterRecipeDto;
    const filterDto = deleteProps(deleteNull(filterRecipeDto), [
      'page',
      'limit',
    ]);
    const filteredPipe = this.recipeModel
      .aggregate()
      .match(filterDto)
      .project({
        _id: 0,
        __v: 0,
        recipe_raw_text: 0,
        origin_url: 0,
        recipe_steps: 0,
        ingredient_requirements: 0,
      })
      .sort({ created_at: -1 })
      .facet({
        recipes: [{ $skip: (page - 1) * limit }, { $limit: limit }],
        count: [{ $count: 'count' }],
      })
      .pipeline();

    const explain = await this.recipeModel.aggregate(filteredPipe).explain();
    console.log(inspect(explain));
    const ret = await this.recipeModel.aggregate(filteredPipe).exec();
    return new RecipesAndCountDto(
      ret[0].recipes,
      ret[0].count.length > 0 ? ret[0].count[0].count : 0,
    );
  }

  async findAllByFullTextSearch(
    textSearchRecipeDto: TextSearchRecipeDto,
  ): Promise<RecipesAndCountDto> {
    const { page, limit } = textSearchRecipeDto;
    const aggrpipe = this.recipeModel
      .aggregate()
      .search({
        index: 'recipe_full_text',
        text: {
          query: textSearchRecipeDto.searchQuery,
          path: [
            'name',
            'description',
            'recipe_raw_text',
            'recipe_steps.description',
          ],
        },
      })
      .sort({
        [textSearchRecipeDto.sort === TextSearchSortBy.RELEVANCE
          ? 'score'
          : textSearchRecipeDto.sort]: -1,
      })
      .project({
        _id: 0,
        __v: 0,
        recipe_raw_text: 0,
        origin_url: 0,
        recipe_steps: 0,
        ingredient_requirements: 0,
      })
      .facet({
        recipes: [{ $skip: (page - 1) * limit }, { $limit: limit }],
        count: [{ $count: 'count' }],
      })
      .pipeline();

    const explain = await this.recipeModel.aggregate(aggrpipe).explain();
    console.log(inspect(explain));
    const ret = await this.recipeModel.aggregate(aggrpipe).exec();
    return new RecipesAndCountDto(
      ret[0].recipes,
      ret[0].count.length > 0 ? ret[0].count[0].count : 0,
    );
  }

  async findOne(id: string): Promise<RecipeDto> {
    return await this.recipeModel
      .findOne({ id })
      .select({
        _id: 0,
        __v: 0,
        recipe_raw_text: 0,
        origin_url: 0,
      })
      .exec();
  }

  async findTopViewed(): Promise<RecipeListViewResponseDto[]> {
    return await this.recipeModel
      .find()
      .sort({ view_count: -1 })
      .limit(10)
      .select({
        _id: 0,
        __v: 0,
        recipe_raw_text: 0,
        origin_url: 0,
        recipe_steps: 0,
        ingredient_requirements: 0,
      })
      .exec();
  }

  async increaseViewCount(id: string): Promise<Recipe> {
    return await this.recipeModel
      .findOneAndUpdate({ id }, { $inc: { view_count: 1 } }, { new: true })
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
    return await this.recipeModel.deleteMany(filterRecipeDto).exec();
  }
}
