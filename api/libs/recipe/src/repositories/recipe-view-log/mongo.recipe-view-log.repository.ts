import { CrudMongoRepository } from '@app/common/repository/crud-mongo.repository';
import {
  RecipeViewLog,
  RecipeViewLogDocument,
} from '@app/recipe/domain/mongo/mongo.recipe-view-log.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecipeViewLogDto } from '../../dto/recipe-view-log/create-recipe-view-log.dto';
import { calcPast1MonthDate } from '@app/common/utils/past-1-month';
import { Inject } from '@nestjs/common';
import { REDIS_PROVIDER } from '@app/common/redis.module';
import { RedisClientType } from 'redis';
import { MongoRecipeRepository } from '../recipe/mongo.recipe.repository';
import { calcRemainMilliseconsByNextDay } from '@app/common/utils/remain-millisecons-by-next-day';
import { IRecipeViewLogRepository } from './recipe-view-log.repository.interface';
import { RecipesItemDto } from '@app/recipe/dto/recipe/recipes-item.dto';

export class RecipeViewLogRepository
  extends CrudMongoRepository<RecipeViewLog, CreateRecipeViewLogDto, any>
  implements IRecipeViewLogRepository
{
  constructor(
    @InjectModel(RecipeViewLog.name)
    private readonly recipeViewLogModel: Model<RecipeViewLogDocument>,
    @Inject(REDIS_PROVIDER) private readonly redisClient: RedisClientType,
    private readonly recipeRepository: MongoRecipeRepository,
  ) {
    super(recipeViewLogModel);
  }

  override async create(
    createRecipeViewLogDto: CreateRecipeViewLogDto,
  ): Promise<RecipeViewLog> {
    const createdEntity = new this.recipeViewLogModel(createRecipeViewLogDto);
    const result = (
      await Promise.all([
        createdEntity.save(),
        this.redisClient.zIncrBy(
          'recipe-view-count',
          1,
          createRecipeViewLogDto.recipeId.toString(),
        ),
      ])
    )[0];
    return result;
  }

  async checkIfRecipeViewCountKeyExists(): Promise<boolean> {
    return (await this.redisClient.EXISTS('recipe-view-count')) > 0;
  }

  async setAllViewedRecipesInPast1Month() {
    const recipesWithCount = await this.findAllViewedRecipesInPast1Month();
    await Promise.all(
      recipesWithCount.map((recipeWithCount) => {
        return this.redisClient.ZADD('recipe-view-count', {
          score: recipeWithCount.count,
          value: recipeWithCount._id.toString(),
        });
      }),
    );
    await this.redisClient.EXPIRE(
      'recipe-view-count',
      Math.floor(calcRemainMilliseconsByNextDay() / 1000),
    );
  }

  async findAll5MostViewedRecipesInPast1Month(): Promise<RecipesItemDto[]> {
    if (await this.redisClient.EXISTS('recipe-view-count')) {
      const recipeIdsWithViews = await this.redisClient.zRangeWithScores(
        'recipe-view-count',
        0,
        5,
        {
          REV: true,
        },
      );
      const recipes = await Promise.all(
        recipeIdsWithViews.map((recipeIdWithView) =>
          this.recipeRepository.findOne(recipeIdWithView.value),
        ),
      );
      return recipes.map((recipe, index) => {
        return new RecipesItemDto(
          recipe.id as any, // bypass type check
          recipe.name,
          recipe.thumbnail,
          recipe.description,
          recipeIdsWithViews[index].score,
          recipe.createdAt,
          recipe.updatedAt,
        );
      });
    }
    return await this.recipeViewLogModel
      .aggregate()
      .match({
        created_at: {
          $gte: calcPast1MonthDate(),
        },
      })
      .group({
        _id: '$recipe_id',
        count: { $sum: 1 },
      })
      .sort({ count: -1 })
      .limit(5)
      .lookup({
        from: 'recipes',
        localField: '_id',
        foreignField: 'id',
        as: 'recipe',
      })
      .unwind({ path: '$recipe', preserveNullAndEmptyArrays: true })
      .replaceRoot({
        $mergeObjects: ['$recipe', '$$ROOT'],
      })
      .project({
        _id: 0,
        __v: 0,
        recipe: 0,
        recipe_raw_text: 0,
        origin_url: 0,
        recipe_steps: 0,
        ingredient_requirements: 0,
      })
      .exec();
  }

  private async findAllViewedRecipesInPast1Month() {
    return await this.recipeViewLogModel
      .aggregate()
      .match({
        created_at: {
          $gte: calcPast1MonthDate(),
        },
      })
      .group({
        _id: '$recipe_id',
        count: { $sum: 1 },
      })
      .exec();
  }
}
