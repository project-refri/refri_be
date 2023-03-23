import { schemaOptions } from '@app/common/schema-option';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Diet } from '../types/diet.enum';

export type UserDocument = HydratedDocument<User>;

@Schema(schemaOptions)
export class User {
  @Prop({ required: true, unique: true, auto: true })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: false, default: '' })
  email: string;

  @Prop({ required: false, default: '' })
  introduction: string;

  @Prop({
    required: true,
    enum: Diet,
    default: Diet.NOMARL,
  })
  diet: Diet;
}

export const UserSchema = SchemaFactory.createForClass(User);
