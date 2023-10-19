import { schemaOptions } from '@app/common/utils/schema-option';
import { ConfigService } from '@nestjs/config';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Diet } from '../types/diet.enum';
import { DeviceToken } from '@app/noti/entity/device-token.entity';

export type UserDocument = HydratedDocument<User>;

@Schema(schemaOptions)
export class User {
  @Prop({ required: true, unique: true, auto: true })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, default: '', unique: true })
  email: string;

  @Prop({ required: false, default: '' })
  introduction: string;

  @Prop({
    required: true,
    type: String,
    enum: Diet,
    default: Diet.NORMAL,
  })
  diet: Diet;

  @Prop({
    required: false,
    type: String,
  })
  thumbnail: string;

  device_tokens: DeviceToken[];

  @Prop({ required: false })
  created_at: Date;

  @Prop({ required: false })
  updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('device_tokens', {
  ref: 'DeviceToken',
  localField: 'id',
  foreignField: 'user_id',
});

export const UserSchemaFactory = (configService: ConfigService) => {
  const schema = UserSchema;
  schema.path('thumbnail', {
    require: true,
    type: String,
    default: `https://${configService.get<string>(
      'AWS_S3_IMAGE_MAIN_BUCKET',
    )}.s3.amazonaws.com/default-user-thumbnail.jpg`,
  });
  return schema;
};
