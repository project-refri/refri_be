import { Injectable } from '@nestjs/common';
import { IAspectProvider } from '../aop/aop.interface';
import { WrapParams } from '@toss/nestjs-aop';

@Injectable()
export class LogAspectProvider implements IAspectProvider {
  wrap({ instance, methodName, method }: WrapParams<any, any>) {
    return async (...args: any[]) => {
      const t = Date.now();
      console.log(
        'log start: ',
        instance,
        '[',
        methodName,
        ']',
        'args: ',
        args,
      );
      const ret = await method(...args);
      console.log('log end, time: ', (Date.now() - t) / 1000, 's');
      return ret;
    };
  }
}
