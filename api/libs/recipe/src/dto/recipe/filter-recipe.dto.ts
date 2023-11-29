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
import { Recipe as MongoRecipe } from '../../entities/mongo/mongo.recipe.entity';
import { OmitType } from '@nestjs/swagger';

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
    public id: number = null,
    public name: string = null,
    public thumbnail: string = null,
    public description: string = null,
    public view_count: number = null,
    public created_at: Date = null,
    public updated_at: Date = null,
  ) {}

  origin_url?: string;
  mongo_id?: string;
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
