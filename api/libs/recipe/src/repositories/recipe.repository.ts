import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  FilterRecipeDto,
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

  async findAll(filterRecipeDto: FilterRecipeDto): Promise<Recipe[]> {
    deleteNull(filterRecipeDto);

    const page = filterRecipeDto.page,
      limit = filterRecipeDto.limit;
    delete filterRecipeDto.page;
    delete filterRecipeDto.limit;
    return await this.recipeModel
      .find(filterRecipeDto)
      .sort({ created_at: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async findAllByFullTextSearch(
    textSearchRecipeDto: TextSearchRecipeDto,
  ): Promise<Recipe[]> {
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
      .lookup({
        from: 'recipes',
        localField: 'id',
        foreignField: 'id',
        as: 'recipe',
      })
      .unwind('$recipe')
      .project({
        _id: -1,
        id: '$recipe.id',
        name: '$recipe.name',
        description: '$recipe.description',
        ingredient_requirements: '$recipe.ingredient_requirements',
        recipe_steps: '$recipe.recipe_steps',
        thumbnail: '$recipe.thumbnail',
        origin_url: '$recipe.origin_url',
        created_at: '$recipe.created_at',
        updated_at: '$recipe.updated_at',
        recipe: -1,
      })
      .pipeline();
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
    return await this.recipeModel.aggregate(aggrpipe).exec();
  }

  async findOne(id: string): Promise<Recipe> {
    return await this.recipeModel.findOne({ id }).exec();
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
