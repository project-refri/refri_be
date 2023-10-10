import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type RecipeScrapRequestDocument = HydratedDocument<RecipeScrapRequest>;

export enum RecipeScrapRequestStatus {
  PENDING = 'PENDING',
  DONE = 'DONE',
  ERROR = 'ERROR',
}

@Schema()
export class RecipeScrapRequest {
  @Prop({
    required: true,
    unique: true,
    auto: true,
    type: MongooseSchema.Types.ObjectId,
  })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  url: string;

  @Prop({ required: false, type: MongooseSchema.Types.ObjectId })
  user: MongooseSchema.Types.ObjectId;

  @Prop({
    required: true,
    enum: RecipeScrapRequestStatus,
    default: RecipeScrapRequestStatus.PENDING,
  })
  status: RecipeScrapRequestStatus;

  @Prop({ required: false })
  created_at: Date;

  @Prop({ required: false })
  updated_at: Date;
}

export const RecipeScrapRequestSchema =
  SchemaFactory.createForClass(RecipeScrapRequest);
