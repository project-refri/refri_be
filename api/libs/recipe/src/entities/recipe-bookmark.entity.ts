import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { schemaOptions } from '@app/common/utils/schema-option';
import { Recipe } from './recipe.entity';

export type RecipeBookmarkDocument = HydratedDocument<RecipeBookmark>;

@Schema(schemaOptions)
export class RecipeBookmark {
  @Prop({
    required: true,
    unique: true,
    auto: true,
    type: MongooseSchema.Types.ObjectId,
  })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: false, type: MongooseSchema.Types.ObjectId })
  user_id: MongooseSchema.Types.ObjectId;

  @Prop({ required: false, type: MongooseSchema.Types.ObjectId })
  recipe_id: MongooseSchema.Types.ObjectId;

  recipe: Recipe;

  @Prop({ required: false })
  created_at: Date;

  @Prop({ required: false })
  updated_at: Date;
}

export const RecipeBookmarkSchema =
  SchemaFactory.createForClass(RecipeBookmark);

RecipeBookmarkSchema.virtual('recipe', {
  ref: 'Recipe',
  localField: 'recipe_id',
  foreignField: 'id',
  justOne: true,
});
