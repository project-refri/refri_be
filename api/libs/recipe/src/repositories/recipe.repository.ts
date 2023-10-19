import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  FilterRecipeDto,
  RecipesAndCountDto,
  TextSearchRecipeDto,
  TextSearchSortBy,
} from '../dto/filter-recipe.dto';
import { CreateRecipeDto, UpdateRecipeDto } from '../dto/modify-recipe.dto';
import { Recipe, RecipeDocument } from '../entities/recipe.entity';
import { deleteNull } from '@app/common/utils/delete-null';

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
        recipe_raw_text: 0,
        origin_url: 0,
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
    return {
      recipes,
      count: count[0].count,
    };
  }

  async findAllByFullTextSearch(
    textSearchRecipeDto: TextSearchRecipeDto,
  ): Promise<RecipesAndCountDto> {
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
      .project({
        _id: 0,
        __v: 0,
        recipe_raw_text: 0,
        origin_url: 0,
      })
      .pipeline();
    const countPromise = this.recipeModel.aggregate(aggrpipe).count('count');

    if (textSearchRecipeDto.sort !== TextSearchSortBy.RELEVANCE) {
      aggrpipe.push({
        $sort: {
          [textSearchRecipeDto.sort]: -1,
        },
      });
    }
    aggrpipe.push({
      $skip: (textSearchRecipeDto.page - 1) * textSearchRecipeDto.limit,
    });
    aggrpipe.push({
      $limit: textSearchRecipeDto.limit,
    });

    const [recipes, count] = await Promise.all([
      this.recipeModel.aggregate(aggrpipe).exec(),
      countPromise.exec(),
    ]);

    return {
      recipes,
      count: count[0].count,
    };
  }

  async findOne(id: string): Promise<Recipe> {
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
