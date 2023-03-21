import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Diet } from '../types/diet.enum';

export type UserDocument = HydratedDocument<User>;

const schemaOptions: SchemaOptions = {
  timestamps: true,
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
    },
  },
};

@Schema(schemaOptions)
export class User {
  @Prop({ required: true, unique: true, auto: true })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true, unique: true })
  user_id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  introduction: string;

  @Prop({
    required: true,
    enum: Diet,
    default: Diet.NOMARL,
  })
  diet: Diet;
}

export const UserSchema = SchemaFactory.createForClass(User);
