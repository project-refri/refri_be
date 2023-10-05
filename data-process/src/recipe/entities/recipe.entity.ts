import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  HydratedDocument,
  Schema as MongooseSchema,
  ToObjectOptions,
  SchemaOptions,
} from 'mongoose';

export type RecipeDocument = HydratedDocument<Recipe>;

const toObjectOptions: ToObjectOptions = {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  },
};

export const schemaOptions: SchemaOptions = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toObject: toObjectOptions,
  toJSON: toObjectOptions,
};

export class IngredientRequirement {
  ingredient_id: MongooseSchema.Types.ObjectId;

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
    type: MongooseSchema.Types.ObjectId,
  })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false, type: MongooseSchema.Types.ObjectId })
  owner: MongooseSchema.Types.ObjectId;

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

  @Prop({ required: false })
  created_at: Date;

  @Prop({ required: false })
  updated_at: Date;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
