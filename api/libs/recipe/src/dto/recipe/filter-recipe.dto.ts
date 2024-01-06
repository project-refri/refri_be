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
  'recipeRawText',
  'originUrl',
]) {}

export class RecipeListViewResponseDto implements IRecipeListViewResponseDto {
  constructor(
    id: number = null,
    name: string = null,
    thumbnail: string = null,
    description: string = null,
    viewCount: number = null,
    createdAt: Date = null,
    updatedAt: Date = null,
  ) {
    this.id = id;
    this.name = name;
    this.thumbnail = thumbnail;
    this.description = description;
    this.viewCount = viewCount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  id: number;
  name: string;
  thumbnail: string;
  description: string;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;

  @ApiHideProperty()
  originUrl?: string;
  @ApiHideProperty()
  mongoId?: string;
  @ApiHideProperty()
  mysqlId?: number;
}

export type IRecipeListViewResponseDto = Omit<
  Recipe,
  'mongoId' | 'ownerId' | 'owner' | 'originUrl'
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
      hasNext: this.count > (page - 1) * limit + this.recipes.length,
    };
  }
}
