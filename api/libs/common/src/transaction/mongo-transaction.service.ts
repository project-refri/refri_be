import { InjectConnection } from '@nestjs/mongoose';
import {
  Aspect,
  LazyDecorator,
  WrapParams,
  createDecorator,
} from '@toss/nestjs-aop';
import { Connection } from 'mongoose';
import { ClsService } from 'nestjs-cls';

export const MONGO_TRANSACTIONAL = Symbol('MONGO_TRANSACTIONAL');

export type TransactionOption = {
  readOnly: boolean;
};

export const MongoTransactional = (option?: TransactionOption) =>
  createDecorator(MONGO_TRANSACTIONAL, { readOnly: false, ...option });

@Aspect(MONGO_TRANSACTIONAL)
export class MongoTransactionService
  implements LazyDecorator<any, TransactionOption>
{
  constructor(
    private readonly clsService: ClsService,
    @InjectConnection() private readonly conn: Connection,
  ) {}

  wrap({ method, metadata }: WrapParams<any, TransactionOption>) {
    return async (...args: any[]) => {
      if (this.clsService.get('transaction_session')) {
        return await method(...args);
      }
      const session = await this.conn.startSession();
      session.startTransaction({
        readPreference: metadata.readOnly ? 'secondaryPreferred' : 'primary',
      });
      this.clsService.set('transaction_session', session);
      try {
        const ret = await method(...args);
        await session.commitTransaction();
        return ret;
      } catch (e) {
        console.log('error catched, aborting transaction');
        await session.abortTransaction();
        throw e;
      } finally {
        session.endSession();
      }
    };
  }
}
