import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MongoSchema } from 'mongoose';
import { schemaOptions } from '@app/common/utils/schema-option';

export type RecipeDocument = HydratedDocument<Recipe>;

export class IngredientRequirement {
  name: string;

  amount: string;
}

export class RecipeStep {
  description: string;

  images: Array<string>;

  ingredients: Array<IngredientRequirement>;
}

@Schema(schemaOptions)
export class Recipe {
  @Prop({
    required: true,
    unique: true,
    auto: true,
    type: MongoSchema.Types.ObjectId,
  })
  id: Types.ObjectId;

  @Prop({ required: false, index: true, path: 'mysql_id' })
  mysqlId: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false, index: true, path: 'owner_id' })
  ownerId: number;

  @Prop({
    required: true,
    type: Array<IngredientRequirement>,
    path: 'ingredient_requirements',
  })
  ingredientRequirements: Array<IngredientRequirement>;

  @Prop({ required: true, type: Array<RecipeStep>, path: 'recipe_steps' })
  recipeSteps: Array<RecipeStep>;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ required: true, type: String, path: 'recipe_raw_text' })
  recipeRawText: string;

  @Prop({ required: true, type: String, path: 'origin_url' })
  originUrl: string;

  @Prop({ required: true, type: Number, path: 'view_count', default: 0 })
  viewCount: number;

  @Prop({ required: false, path: 'created_at' })
  createdAt: Date;

  @Prop({ required: false, path: 'updated_at' })
  updatedAt: Date;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);

RecipeSchema.index({ '$**': 'text' });
