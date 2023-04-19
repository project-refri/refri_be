import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { schemaOptions } from '@app/common/utils/schema-option';

export type RecipeDocument = HydratedDocument<Recipe>;

export class IngredientRequirement {
  ingredient_id: MongooseSchema.Types.ObjectId;

  name: string;

  amount: string;
}

export class RecipeStep {
  step_count: number;

  description: string;

  image: string;
}

@Schema(schemaOptions)
export class Recipe {
  @Prop({
    required: true,
    unique: true,
    auto: true,
    type: MongooseSchema.Types.ObjectId,
  })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId })
  owner: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, type: Array<IngredientRequirement> })
  ingredient_requirements: Array<IngredientRequirement>;

  @Prop({ required: true, type: Array<RecipeStep> })
  recipe_steps: Array<RecipeStep>;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ required: false })
  created_at: Date;

  @Prop({ required: false })
  updated_at: Date;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
