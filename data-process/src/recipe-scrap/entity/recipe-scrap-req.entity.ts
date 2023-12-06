import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
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
    type: Types.ObjectId,
  })
  id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  url: string;

  @Prop({ required: false, type: Types.ObjectId })
  user: Types.ObjectId;

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
