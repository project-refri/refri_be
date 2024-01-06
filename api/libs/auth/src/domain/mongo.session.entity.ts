import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { schemaOptions } from '@app/common/utils/schema-option';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { User } from '@app/user/domain/mongo.user.entity';

export type SessionDocument = HydratedDocument<Session>;

@Schema(schemaOptions)
export class Session {
  @Prop({ required: true, auto: true, unique: true })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  session_token: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
  })
  user_id: MongooseSchema.Types.ObjectId;

  user: User;

  @Prop({
    required: false,
    type: Date,
  })
  created_at: Date;

  @Prop({ required: false })
  updated_at: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Session);

SessionSchema.virtual('user', {
  ref: 'User',
  localField: 'user_id',
  foreignField: 'id',
  justOne: true,
});

export const SessionSchemaFactory = (configService: ConfigService) => {
  const schema = SessionSchema;
  schema.index(
    { created_at: 1 },
    {
      expireAfterSeconds: parseInt(
        configService.get<string>('SESSION_EXPIRES_IN'),
      ),
    },
  );
  return schema;
};
