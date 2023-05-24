import { Injectable } from '@nestjs/common';
import { IAspectProvider, WrapParams } from '../aop/aop.interface';

@Injectable()
export class LogAspectProvider implements IAspectProvider {
  wrap({ instance, methodName, method }: WrapParams<any, any>) {
    return async (...args: any[]) => {
      const t = Date.now();
      console.log(
        'log start: ',
        instance.constructor,
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
