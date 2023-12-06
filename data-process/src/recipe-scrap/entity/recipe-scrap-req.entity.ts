import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MongoSchema } from 'mongoose';
import { schemaOptions } from 'src/common/schema.option';

export type RecipeScrapRequestDocument = HydratedDocument<RecipeScrapRequest>;

export enum RecipeScrapRequestStatus {
  PENDING = 'PENDING',
  DONE = 'DONE',
  ERROR = 'ERROR',
}

@Schema(schemaOptions)
export class RecipeScrapRequest {
  @Prop({
    required: true,
    unique: true,
    auto: true,
    type: MongoSchema.Types.ObjectId,
  })
  id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  url: string;

  @Prop({ required: false, type: MongoSchema.Types.ObjectId })
  user_id: Types.ObjectId;

  @Prop({
    required: true,
    enum: RecipeScrapRequestStatus,
    default: RecipeScrapRequestStatus.PENDING,
  })
  status: RecipeScrapRequestStatus;

  @Prop({ required: false })
  recipe_id?: number;

  @Prop({ required: false })
  recipe_json?: string;

  @Prop({ required: false })
  created_at: Date;

  @Prop({ required: false })
  updated_at: Date;
}

export const RecipeScrapRequestSchema =
  SchemaFactory.createForClass(RecipeScrapRequest);
