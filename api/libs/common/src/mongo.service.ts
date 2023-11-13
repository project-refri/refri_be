import { Injectable } from '@nestjs/common';
import { Schema } from 'mongoose';
import { ClsService } from 'nestjs-cls';

export const TRANSACTION_SESSION = Symbol('TRANSACTION_SESSION');

@Injectable()
export class MongoService {
  constructor(private readonly clsService: ClsService) {}

  addSessionPlugin(schema: Schema, options: any) {
    const clsService = this.clsService;
    schema.pre(
      [
        'count',
        'estimatedDocumentCount',
        'countDocuments',
        'deleteMany',
        'distinct',
        'find',
        'findOne',
        'findOneAndDelete',
        'findOneAndRemove',
        'findOneAndReplace',
        'findOneAndUpdate',
        'replaceOne',
        'updateMany',
      ],
      async function () {
        this.session(clsService.get(TRANSACTION_SESSION));
      },
    );
    schema.pre(['updateOne', 'deleteOne'], async function () {
      this.session(clsService.get(TRANSACTION_SESSION));
    });
    schema.pre(['save', 'init', 'validate'], async function () {
      this.$session(clsService.get(TRANSACTION_SESSION));
    });
    schema.pre('aggregate', async function () {
      this.session(clsService.get(TRANSACTION_SESSION));
    });
  }
}
