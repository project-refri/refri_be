import { RecipeViewLogEntity } from '@app/recipe/domain/recipe-view-log.entity';
import { IRecipeViewLogRepository } from './recipe-view-log.repository.interface';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { REDIS_PROVIDER } from '@app/common/redis.module';
import { Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { RecipeRepository } from '../recipe/recipe.repository';
import { calcRemainMilliseconsByNextDay } from '@app/common/utils/remain-millisecons-by-next-day';
import { calcPast1MonthDate } from '@app/common/utils/past-1-month';
import { FilterRecipeDto } from '@app/recipe/dto/recipe/filter-recipe.dto';
import { RecipesItemDto } from '@app/recipe/dto/recipe/recipes-item.dto';
import { RecipesAndCountDto } from '@app/recipe/dto/recipe/recipes-count.dto';

export class RecipeViewLogRepository implements IRecipeViewLogRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(REDIS_PROVIDER) private readonly redisClient: RedisClientType,
    @Inject('PrismaRecipeRepository')
    private readonly recipeRepository: RecipeRepository,
  ) {}

  async create(entity: RecipeViewLogEntity): Promise<RecipeViewLogEntity> {
    const createdEntity = this.prisma.recipeViewLog.create({
      data: {
        recipeId: entity.recipeId,
        userId: entity.userId,
        userIp: entity.userIp,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
    });
    return (
      await Promise.all([
        createdEntity,
        this.redisClient.zIncrBy(
          'recipe-view-count',
          1,
          entity.recipeId.toString(),
        ),
      ])
    )[0];
  }

  async findOne(id: number): Promise<RecipeViewLogEntity> {
    return await await this.prisma.recipeViewLog.findUnique({
      where: {
        id,
      },
    });
  }

  async checkIfRecipeViewCountKeyExists(): Promise<boolean> {
    return (await this.redisClient.EXISTS('recipe-view-count')) > 0;
  }

  async setAllViewedRecipesInPast1Month() {
    const recipesWithCount = await this.prisma.recipeViewLog.groupBy({
      by: ['recipeId'],
      _count: true,
      where: {
        createdAt: {
          gte: calcPast1MonthDate(),
        },
      },
    });
    await Promise.all(
      recipesWithCount.map((recipeWithCount) => {
        return this.redisClient.ZADD('recipe-view-count', {
          score: recipeWithCount._count,
          value: recipeWithCount.recipeId.toString(),
        });
      }),
    );
    await this.redisClient.EXPIRE(
      'recipe-view-count',
      Math.floor(calcRemainMilliseconsByNextDay() / 1000),
    );
  }

  async findAllRecentViewed(filterRecipeDto: FilterRecipeDto, userId: number) {
    const { page, limit } = filterRecipeDto;
    const [viewLogsWithRecipe, count] = await Promise.all([
      this.prisma.recipeViewLog.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          recipeId: true,
          recipe: {
            select: {
              id: true,
              name: true,
              thumbnail: true,
              description: true,
              viewCount: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      }),
      this.prisma.recipeViewLog.count({
        where: {
          userId: userId,
        },
      }),
    ]);
    const recipes = viewLogsWithRecipe.map(
      (viewLogWithRecipe) =>
        new RecipesItemDto(
          viewLogWithRecipe.recipe.id,
          viewLogWithRecipe.recipe.name,
          viewLogWithRecipe.recipe.thumbnail,
          viewLogWithRecipe.recipe.description,
          viewLogWithRecipe.recipe.viewCount,
          viewLogWithRecipe.recipe.createdAt,
          viewLogWithRecipe.recipe.updatedAt,
        ),
    );
    return new RecipesAndCountDto(recipes, count);
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
          this.recipeRepository.findOne(parseInt(recipeIdWithView.value)),
        ),
      );
      return recipes.map((recipe, index) => {
        return new RecipesItemDto(
          recipe.id,
          recipe.name,
          recipe.thumbnail,
          recipe.description,
          recipeIdsWithViews[index].score,
          recipe.createdAt,
          recipe.updatedAt,
        );
      });
    }
    const recipeIds = await this.prisma.recipeViewLog.groupBy({
      by: ['recipeId'],
      _count: {
        createdAt: true,
      },
      orderBy: {
        _count: {
          createdAt: 'desc',
        },
      },
      take: 5,
      where: {
        createdAt: {
          gte: calcPast1MonthDate(),
        },
      },
    });
    return await Promise.all(
      recipeIds.map(async (recipeId) => {
        const recipe = await this.recipeRepository.findOne(recipeId.recipeId);
        return new RecipesItemDto(
          recipe.id,
          recipe.name,
          recipe.thumbnail,
          recipe.description,
          recipeId._count.createdAt,
          recipe.createdAt,
          recipe.updatedAt,
        );
      }),
    );
  }

  async findAll(): Promise<RecipeViewLogEntity[]> {
    return await this.prisma.recipeViewLog.findMany();
  }

  async update(id: number, updateDto: any): Promise<RecipeViewLogEntity> {
    throw new Error('Method not implemented.');
  }

  async deleteOne(id: number): Promise<RecipeViewLogEntity> {
    throw new Error('Method not implemented.');
  }
}
