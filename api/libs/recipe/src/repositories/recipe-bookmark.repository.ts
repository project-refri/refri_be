import { CrudMongoRepository } from '@app/common/crud-mongo.repository';
import {
  RecipeBookmark,
  RecipeBookmarkDocument,
} from '../entities/recipe-bookmark.entity';
import { CreateRecipeBookmarkDto } from '../dto/modify-recipe-bookmark.dto';
import {
  FilterRecipeBookmarkDto,
  RecipeBookmarksAndCountDto,
} from '../dto/filter-recipe-bookmark.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export class RecipeBookmarkRepository extends CrudMongoRepository<
  RecipeBookmark,
  CreateRecipeBookmarkDto,
  any,
  FilterRecipeBookmarkDto
> {
  constructor(
    @InjectModel(RecipeBookmark.name)
    private readonly recipeBookmarkModel: Model<RecipeBookmarkDocument>,
  ) {
    super(recipeBookmarkModel);
  }

  async findAllRecipeBookmarked(
    _filterRecipeBookmarkDto: FilterRecipeBookmarkDto,
  ): Promise<RecipeBookmarksAndCountDto> {
    const filterRecipeBookmarkDto = {
      ..._filterRecipeBookmarkDto,
      user_id: new Types.ObjectId(_filterRecipeBookmarkDto.user_id),
    };
    const { page, limit } = filterRecipeBookmarkDto;
    delete filterRecipeBookmarkDto.page;
    delete filterRecipeBookmarkDto.limit;
    const filteredAggrPipe = this.recipeBookmarkModel
      .aggregate()
      .match(filterRecipeBookmarkDto)
      .pipeline();

    const ret = await this.recipeBookmarkModel
      .aggregate(filteredAggrPipe)
      .facet({
        recipes: [
          {
            $sort: { created_at: -1 },
          },
          {
            $skip: (page - 1) * limit,
          },
          {
            $limit: limit,
          },
          {
            $lookup: {
              from: 'recipes',
              localField: 'recipe_id',
              foreignField: 'id',
              as: 'recipe',
            },
          },
          {
            $unwind: '$recipe',
          },
          {
            $replaceRoot: {
              newRoot: {
                $mergeObjects: [
                  {
                    recipe_bookmark_id: '$id',
                  },
                  '$recipe',
                ],
              },
            },
          },
          {
            $project: {
              _id: 0,
              __v: 0,
              recipe_raw_text: 0,
              origin_url: 0,
              recipe_steps: 0,
              ingredient_requirements: 0,
            },
          },
        ],
        count: [
          {
            $count: 'count',
          },
        ],
      })
      .exec();
    return new RecipeBookmarksAndCountDto(
      ret[0].recipes,
      ret[0].count.length > 0 ? ret[0].count[0].count : 0,
    );
  }
}
