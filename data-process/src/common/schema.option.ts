import { SchemaOptions, ToObjectOptions } from 'mongoose';

export const toObjectOptions: ToObjectOptions = {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  },
};

export const schemaOptions: SchemaOptions = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toObject: toObjectOptions,
  toJSON: toObjectOptions,
};
