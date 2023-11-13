import {
  PagenationDto,
  PagenationResponseDto,
} from '@app/common/dto/pagenation.dto';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Recipe } from '../../entities/recipe.entity';
import { OmitType } from '@nestjs/swagger';
import { Schema, Types } from 'mongoose';
import { User } from '@app/user/entities/user.entity';

export class FilterRecipeDto extends PagenationDto {
  constructor(
    page: number,
    limit: number,
    name?: string,
    owner?: string,
    created_at?: Date,
    updated_at?: Date,
  ) {
    super(page, limit);
    this.name = name;
    this.owner = owner;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  owner?: string;

  @IsDate()
  @IsOptional()
  created_at?: Date;

  @IsDate()
  @IsOptional()
  updated_at?: Date;
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

export class RecipeDto extends OmitType(Recipe, [
  'recipe_raw_text',
  'origin_url',
] as const) {}

export class RecipeListViewResponseDto extends OmitType(Recipe, [
  'recipe_raw_text',
  'origin_url',
  'recipe_steps',
  'ingredient_requirements',
] as const) {
  constructor(
    id: Schema.Types.ObjectId = null,
    owner: User = null,
    name: string = null,
    thumbnail: string = null,
    description: string = null,
    view_count: number = null,
    created_at: Date = null,
    updated_at: Date = null,
  ) {
    super();
    this.id = id;
    this.owner = null;
    this.name = name;
    this.thumbnail = thumbnail;
    this.description = description;
    this.view_count = view_count;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

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
