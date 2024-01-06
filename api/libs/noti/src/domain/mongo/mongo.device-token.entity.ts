import { schemaOptions } from '@app/common/utils/schema-option';
import { User } from '@app/user/domain/mongo.user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type DeviceTokenDocument = HydratedDocument<DeviceToken>;

@Schema(schemaOptions)
export class DeviceToken {
  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    unique: true,
    auto: true,
  })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId })
  user_id: MongooseSchema.Types.ObjectId;

  user: User;

  @Prop({ required: true })
  fcm_device_token: string;

  @Prop({ required: false })
  created_at: Date;

  @Prop({ required: false })
  updated_at: Date;
}

export const DeviceTokenSchema = SchemaFactory.createForClass(DeviceToken);
