import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  HydratedDocument,
  Schema as MongooseSchema,
  SchemaOptions,
  ToObjectOptions,
} from 'mongoose';
// import { schemaOptions } from '@app/common/utils/schema-option';
import { Recipe } from './recipe.entity';

const toObjectOptions: ToObjectOptions = {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
  },
};

const schemaOptions: SchemaOptions = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toObject: toObjectOptions,
  toJSON: toObjectOptions,
};

export type RecipeViewLogDocument = HydratedDocument<RecipeViewLog>;

@Schema(schemaOptions)
export class RecipeViewLog {
  _id: MongooseSchema.Types.ObjectId;

  get id(): string {
    return this._id.toString();
  }

  @Prop({ required: false, type: MongooseSchema.Types.ObjectId })
  user_id: MongooseSchema.Types.ObjectId;

  @Prop({ required: false })
  user_ip: string;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId })
  recipe_id: MongooseSchema.Types.ObjectId;

  recipe: Recipe;

  @Prop({ required: false, index: true })
  created_at: Date;

  @Prop({ required: false })
  updated_at: Date;
}

export const RecipeViewLogSchema = SchemaFactory.createForClass(RecipeViewLog);
