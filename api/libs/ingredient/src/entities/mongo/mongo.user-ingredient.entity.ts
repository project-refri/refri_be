import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { FoodType } from '../../types/food-type.enum';
import { StoreMethod } from '../../types/store-method.enum';
import { schemaOptions } from '@app/common/utils/schema-option';
import { User } from '@app/user/entities/mongo.user.entity';
import { ConfigService } from '@nestjs/config';

export type UserIngredientDocument = HydratedDocument<UserIngredient>;

@Schema(schemaOptions)
export class UserIngredient {
  @Prop({ required: true, unique: true, auto: true })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId })
  ingredient_id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId })
  user_id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, type: String, enum: FoodType, default: FoodType.ETC })
  food_type: FoodType;

  @Prop({
    required: true,
    type: String,
    enum: StoreMethod,
    default: StoreMethod.REFRIGERATE,
  })
  store_method: StoreMethod;

  @Prop({ required: true, type: Number, default: 0 })
  count: number;

  @Prop({ required: true, type: Number, default: 0 })
  days_before_expiration: number;

  @Prop({ required: true, type: String })
  icon: string;

  @Prop({ required: false })
  created_at: Date;

  @Prop({ required: false })
  updated_at: Date;
}

export const UserIngredientSchema =
  SchemaFactory.createForClass(UserIngredient);

UserIngredientSchema.virtual('user', {
  ref: User.name,
  localField: 'user_id',
  foreignField: 'id',
  justOne: true,
});

export const UserIngredientSchemaFactory = (configService: ConfigService) => {
  const schema = UserIngredientSchema;
  schema.path('icon', {
    require: true,
    type: String,
    default: `https://${configService.get(
      'AWS_S3_IMAGE_MAIN_BUCKET',
    )}.s3.ap-northeast-2.amazonaws.com/ingredient-default-icon.svg`,
  });
  return schema;
};
