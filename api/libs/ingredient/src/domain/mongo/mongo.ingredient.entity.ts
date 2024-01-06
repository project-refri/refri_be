import { schemaOptions } from '@app/common/utils/schema-option';
import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type IngredientDocument = HydratedDocument<Ingredient>;

@Schema(schemaOptions)
export class Ingredient {
  @Prop({
    required: true,
    unique: true,
    auto: true,
    type: MongooseSchema.Types.ObjectId,
  })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ required: true })
  icon: string;

  @Prop({ required: false })
  created_at: Date;

  @Prop({ required: false })
  updated_at: Date;
}
