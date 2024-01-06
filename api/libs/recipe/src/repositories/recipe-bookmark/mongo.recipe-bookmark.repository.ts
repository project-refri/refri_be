import { CrudMongoRepository } from '@app/common/repository/crud-mongo.repository';
import {
  RecipeBookmark,
  RecipeBookmarkDocument,
} from '../../entities/mongo/mongo.recipe-bookmark.entity';
import { CreateRecipeBookmarkDto } from '../../dto/recipe-bookmark/modify-recipe-bookmark.dto';
import {
  FilterRecipeBookmarkDto,
  RecipeBookmarksAndCountDto,
} from '../../dto/recipe-bookmark/filter-recipe-bookmark.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { transferObjectId } from '@app/common/utils/transfer-objectId';
import { deleteProps } from '@app/common/utils/delete-props';
import { IRecipeBookmarkRepository } from './recipe-bookmark.interface';

export class RecipeBookmarkRepository
  extends CrudMongoRepository<
    RecipeBookmark,
    CreateRecipeBookmarkDto,
    any,
    FilterRecipeBookmarkDto
  >
  implements IRecipeBookmarkRepository
{
  constructor(
    @InjectModel(RecipeBookmark.name)
    private readonly recipeBookmarkModel: Model<RecipeBookmarkDocument>,
  ) {
    super(recipeBookmarkModel);
  }

  async findAllRecipeBookmarked(
    filterRecipeBookmarkDto: FilterRecipeBookmarkDto,
  ): Promise<RecipeBookmarksAndCountDto> {
    const { page, limit } = filterRecipeBookmarkDto;
    const filterDto = deleteProps(
      transferObjectId(filterRecipeBookmarkDto, ['userId']),
      ['page', 'limit'],
    );
    const filteredAggrPipe = this.recipeBookmarkModel
      .aggregate()
      .match(filterDto)
      .sort({ created_at: -1 })
      .pipeline();

    const ret = await this.recipeBookmarkModel
      .aggregate(filteredAggrPipe)
      .facet({
        recipes: [
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
