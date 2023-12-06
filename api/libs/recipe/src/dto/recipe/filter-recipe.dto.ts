import {
  PagenationDto,
  PagenationResponseDto,
} from '@app/common/dto/pagenation.dto';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Recipe } from '../../entities/recipe.entity';
import { Recipe as MongoRecipe } from '../../entities/mongo/mongo.recipe.entity';
import { ApiHideProperty, OmitType } from '@nestjs/swagger';

export class FilterRecipeDto extends PagenationDto {
  constructor(
    page: number,
    limit: number,
    name?: string,
    owner_id?: number,
    created_at?: Date,
    updated_at?: Date,
  ) {
    super(page, limit);
    this.name = name;
    this.owner_id = owner_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsNotEmpty()
  @IsOptional()
  owner_id?: number;

  @IsDate()
  @IsOptional()
  created_at?: Date;

  @IsDate()
  @IsOptional()
  updated_at?: Date;

  @IsInt()
  @IsOptional()
  mysql_id?: number;
}

export enum TextSearchSortBy {
  RELEVANCE = 'RELEVANCE',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
}

export class TextSearchRecipeDto extends PagenationDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  searchQuery?: string;

  @IsEnum(TextSearchSortBy)
  @IsOptional()
  sort?: TextSearchSortBy;
}

export class RecipeDto extends OmitType(MongoRecipe, [
  'recipe_raw_text',
  'origin_url',
]) {}

export class RecipeListViewResponseDto implements IRecipeListViewResponseDto {
  constructor(
    id: number = null,
    name: string = null,
    thumbnail: string = null,
    description: string = null,
    view_count: number = null,
    created_at: Date = null,
    updated_at: Date = null,
  ) {
    this.id = id;
    this.name = name;
    this.thumbnail = thumbnail;
    this.description = description;
    this.view_count = view_count;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  id: number;
  name: string;
  thumbnail: string;
  description: string;
  view_count: number;
  created_at: Date;
  updated_at: Date;

  @ApiHideProperty()
  origin_url?: string;
  @ApiHideProperty()
  mongo_id?: string;
  @ApiHideProperty()
  mysql_id?: number;
}

export type IRecipeListViewResponseDto = Omit<
  Recipe,
  | 'mongo_id'
  | 'owner_id'
  | 'recipe_raw_text'
  | 'origin_url'
  | 'recipe_steps'
  | 'ingredient_requirements'
>;

export class RecipesResponseDto extends PagenationResponseDto {
  results: RecipeListViewResponseDto[];
}

export class RecipesAndCountDto {
  recipes: RecipeListViewResponseDto[];
  count: number;

  constructor(recipes: RecipeListViewResponseDto[], count: number) {
    this.recipes = recipes;
    this.count = count;
  }

  toRecipesResponseDto(page: number, limit: number): RecipesResponseDto {
    return {
      results: this.recipes,
      page,
      count: this.recipes.length,
      has_next: this.count > (page - 1) * limit + this.recipes.length,
    };
  }
}
