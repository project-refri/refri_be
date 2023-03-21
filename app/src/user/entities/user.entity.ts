import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import {
  HydratedDocument,
  Schema as MongooseSchema,
  ToObjectOptions,
} from 'mongoose';
import { Diet } from '../types/diet.enum';

export type UserDocument = HydratedDocument<User>;

const toObjectOptions: ToObjectOptions = {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
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

@Schema(schemaOptions)
export class User {
  @Prop({ required: true, unique: true, auto: true })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true, unique: true })
  user_id: string;

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
