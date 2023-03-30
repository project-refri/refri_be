import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { schemaOptions } from '@app/common/schema-option';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { ConfigService } from '@nestjs/config';

export type RefreshTokenDocument = HydratedDocument<RefreshToken>;

@Schema(schemaOptions)
export class RefreshToken {
  @Prop({ required: true, auto: true, unique: true })
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  refresh_token: string;

  @Prop({ required: true })
  uuid: string;

  @Prop({
    required: false,
    type: Date,
  })
  created_at: Date;

  @Prop({ required: false })
  updated_at: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);

export const RefreshTokenSchemaFactory = (configService: ConfigService) => {
  const schema = RefreshTokenSchema;
  schema.index(
    { created_at: 1 },
    {
      expireAfterSeconds: parseInt(
        configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
      ),
    },
  );
  return schema;
};
