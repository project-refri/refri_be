import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilterRecipeDto } from '../../dto/recipe/filter-recipe.dto';
import { UpdateMongoRecipeDto } from '../../dto/recipe/update-mongo-recipe.dto';
import {
  Recipe,
  RecipeDocument,
} from '@app/recipe/domain/mongo/mongo.recipe.entity';
import { deleteNull } from '@app/common/utils/delete-null';
import { deleteProps } from '@app/common/utils/delete-props';
import { Logable } from '@app/common/log/log.decorator';
import { Cacheable } from '@app/common/cache/cache.service';
import { CreateMongoRecipeDto } from '@app/recipe/dto/recipe/create-mongo-recipe.dto';
import {
  TextSearchRecipeDto,
  TextSearchSortBy,
} from '@app/recipe/dto/recipe/text-search.dto';
import { RecipeDetailDto } from '@app/recipe/dto/recipe/recipe-detail.dto';
import { RecipesItemDto } from '@app/recipe/dto/recipe/recipes-item.dto';
import { RecipesAndCountDto } from '@app/recipe/dto/recipe/recipes-count.dto';

@Injectable()
export class MongoRecipeRepository {
  constructor(
    @InjectModel(Recipe.name)
    private readonly recipeModel: Model<RecipeDocument>,
  ) {}

  async create(createRecipeDto: CreateMongoRecipeDto): Promise<Recipe> {
    const createdEntity = new this.recipeModel(createRecipeDto);
    return (await createdEntity.save())?.toObject();
  }

  async findAll(filterRecipeDto: FilterRecipeDto): Promise<RecipesAndCountDto> {
    const { page, limit } = filterRecipeDto;
    const filterDto = deleteNull(
      deleteProps(filterRecipeDto, ['page', 'limit']),
    );
    const filteredPipe = this.recipeModel
      .aggregate()
      .match(filterDto)
      .project({
        _id: 0,
        __v: 0,
        recipe_raw_text: 0,
        recipe_steps: 0,
        ingredient_requirements: 0,
      })
      .sort({ created_at: -1 })
      .facet({
        recipes: [{ $skip: (page - 1) * limit }, { $limit: limit }],
        count: [{ $count: 'count' }],
      })
      .pipeline();

    const ret = await this.recipeModel.aggregate(filteredPipe).exec();
    return new RecipesAndCountDto(
      ret[0].recipes,
      ret[0].count.length > 0 ? ret[0].count[0].count : 0,
    );
  }

  async findAllRecipe(
    filterRecipeDto: FilterRecipeDto,
  ): Promise<RecipesAndCountDto> {
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

    const ret = await this.recipeModel.aggregate(filteredPipe).exec();
    return new RecipesAndCountDto(
      ret[0].recipes,
      ret[0].count.length > 0 ? ret[0].count[0].count : 0,
    );
  }

  @Logable()
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
      .facet({
        recipes: [
          {
            $addFields: {
              mongo_id: '$id',
              id: '$mysql_id',
            },
          },
          {
            $project: {
              _id: 0,
              __v: 0,
              mysql_id: 0,
              recipe_raw_text: 0,
              origin_url: 0,
              recipe_steps: 0,
              ingredient_requirements: 0,
            },
          },
          { $skip: (page - 1) * limit },
          { $limit: limit },
        ],
        count: [{ $count: 'count' }],
      })
      .pipeline();

    const ret = await this.recipeModel.aggregate(aggrpipe).exec();
    return new RecipesAndCountDto(
      ret[0].recipes,
      ret[0].count.length > 0 ? ret[0].count[0].count : 0,
    );
  }

  @Logable()
  async findAllByFullTextSearch2(
    textSearchRecipeDto: TextSearchRecipeDto,
  ): Promise<RecipesAndCountDto> {
    const { page, limit } = textSearchRecipeDto;
    const aggrpipe = this.recipeModel
      .aggregate()
      .match({
        $text: {
          $search: textSearchRecipeDto.searchQuery,
        },
      })
      .sort({
        score: { $meta: 'textScore' },
      })
      .project({
        score: { $meta: 'textScore' },
        _id: 0,
        __v: 0,
        recipe_raw_text: 0,
        origin_url: 0,
        recipe_steps: 0,
        ingredient_requirements: 0,
      })
      .facet({
        recipes: [
          {
            $addFields: {
              mongo_id: '$id',
              id: '$mysql_id',
            },
          },
          {
            $project: {
              mysql_id: 0,
            },
          },
          { $skip: (page - 1) * limit },
          { $limit: limit },
        ],
        count: [{ $count: 'count' }],
      })
      .pipeline();

    const ret = await this.recipeModel.aggregate(aggrpipe).exec();
    return new RecipesAndCountDto(
      ret[0].recipes,
      ret[0].count.length > 0 ? ret[0].count[0].count : 0,
    );
  }

  @Logable()
  @Cacheable({
    ttl: 5 * 60 * 1000,
    keyGenerator: (mySqlId: number) => `recipe:id:mysql-${mySqlId}`,
  })
  async findOneByMysqlId(mySqlId: number): Promise<RecipeDetailDto> {
    return (
      await this.recipeModel
        .findOne({ mysql_id: mySqlId })
        .select({
          _id: 0,
          __v: 0,
          recipe_raw_text: 0,
          origin_url: 0,
        })
        .exec()
    )?.toObject();
  }

  @Logable()
  @Cacheable({
    ttl: 5 * 60 * 1000,
    keyGenerator: (id: string) => `recipe:id:mongo-${id}`,
  })
  async findOne(id: string): Promise<RecipeDetailDto> {
    return (
      await this.recipeModel
        .findOne({ id })
        .select({
          _id: 0,
          __v: 0,
          recipe_raw_text: 0,
          origin_url: 0,
        })
        .exec()
    )?.toObject();
  }

  async findTopViewed(): Promise<RecipesItemDto[]> {
    return (
      await this.recipeModel
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
        .exec()
    ).map((recipe) => recipe.toObject());
  }

  async findAllByIds(ids: string[]): Promise<RecipesItemDto[]> {
    return (
      await this.recipeModel
        .find({ id: { $in: ids } })
        .select({
          _id: 0,
          __v: 0,
          recipe_raw_text: 0,
          origin_url: 0,
          recipe_steps: 0,
          ingredient_requirements: 0,
        })
        .exec()
    ).map((recipe) => recipe.toObject());
  }

  async increaseViewCountByMySqlId(mySqlId: number): Promise<Recipe> {
    return (
      await this.recipeModel
        .findOneAndUpdate(
          { mysql_id: mySqlId },
          { $inc: { view_count: 1 } },
          { new: true },
        )
        .exec()
    )?.toObject();
  }

  async update(
    id: string,
    updateRecipeDto: UpdateMongoRecipeDto,
  ): Promise<Recipe> {
    return (
      await this.recipeModel
        .findOneAndUpdate({ id }, updateRecipeDto, { new: true })
        .exec()
    )?.toObject();
  }

  async deleteOne(id: string): Promise<Recipe> {
    return (await this.recipeModel.findOneAndDelete({ id }).exec())?.toObject();
  }

  async deleteOneByMysqlId(mysqlId: number): Promise<Recipe> {
    return (
      await this.recipeModel.findOneAndDelete({ mysql_id: mysqlId }).exec()
    )?.toObject();
  }

  async deleteAll(filterRecipeDto: FilterRecipeDto): Promise<any> {
    return await this.recipeModel.deleteMany(filterRecipeDto).exec();
  }
}
