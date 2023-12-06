import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MongoSchema } from 'mongoose';
import { schemaOptions } from '@app/common/utils/schema-option';

export type RecipeDocument = HydratedDocument<Recipe>;

export class IngredientRequirement {
  ingredient_id: Types.ObjectId;

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

  @Prop({ required: false, index: true })
  mysql_id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  owner_id: number;

  @Prop({ required: true, type: Array<IngredientRequirement> })
  ingredient_requirements: Array<IngredientRequirement>;

  @Prop({ required: true, type: Array<RecipeStep> })
  recipe_steps: Array<RecipeStep>;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ required: true })
  recipe_raw_text: string;

  @Prop({ required: true })
  origin_url: string;

  @Prop({ required: true, default: 0 })
  view_count: number;

  @Prop({ required: false })
  created_at: Date;

  @Prop({ required: false })
  updated_at: Date;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);

RecipeSchema.index({ '$**': 'text' });
