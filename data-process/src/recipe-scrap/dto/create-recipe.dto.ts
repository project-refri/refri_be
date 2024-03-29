import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  ValidateNested,
} from 'class-validator';

class IngredientRequirementDto {
  constructor(ingredient_id: string, name: string, amount: string) {
    this.ingredient_id = ingredient_id;
    this.name = name;
    this.amount = amount ?? '적당량';
  }

  @IsMongoId()
  @IsOptional()
  @IsString()
  ingredient_id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  amount: string;
}

export class RecipeStepDto {
  constructor(
    description: string,
    images: string[],
    ingredients: IngredientRequirementDto[],
  ) {
    this.description = description;
    this.images = images;
    this.ingredients =
      ingredients?.map(
        (item) =>
          new IngredientRequirementDto(
            item.ingredient_id,
            item.name,
            item.amount,
          ),
      ) ?? [];
  }
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsUrl(
    {},
    {
      each: true,
    },
  )
  images: string[];

  @ValidateNested()
  @IsArray()
  ingredients: IngredientRequirementDto[];
}

export class CreateMongoRecipeDto {
  constructor(
    name: string,
    description: string,
    owner_id: string,
    ingredient_requirements: IngredientRequirementDto[],
    recipe_steps: RecipeStepDto[],
    thumbnail: string,
    recipe_raw_text: string,
    origin_url: string,
  ) {
    this.name = name;
    this.description = description;
    this.owner_id = owner_id;
    this.ingredient_requirements = ingredient_requirements.map(
      (item) =>
        new IngredientRequirementDto(
          item.ingredient_id,
          item.name,
          item.amount,
        ),
    );
    this.recipe_steps = recipe_steps.map(
      (item) =>
        new RecipeStepDto(item.description, item.images, item.ingredients),
    );
    this.thumbnail = thumbnail;
    this.recipe_raw_text = recipe_raw_text;
    this.origin_url = origin_url;
  }

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  mysql_id?: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsMongoId()
  @IsString()
  @IsOptional()
  owner_id?: string;

  @ValidateNested()
  @ArrayNotEmpty()
  @IsArray()
  ingredient_requirements: IngredientRequirementDto[];

  @ValidateNested()
  @ArrayNotEmpty()
  @IsArray()
  recipe_steps: RecipeStepDto[];

  @IsUrl()
  @IsString()
  thumbnail: string;

  @IsString()
  @IsNotEmpty()
  recipe_raw_text: string;

  @IsUrl()
  @IsString()
  origin_url: string;
}
