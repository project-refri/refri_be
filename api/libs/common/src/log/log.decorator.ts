import { LazyDecorator, WrapParams, createDecorator } from '@toss/nestjs-aop';

export const LOG = Symbol('LOG');

export const Logable = () => createDecorator(LOG);

export class LogDecorator implements LazyDecorator<any, any> {
  wrap({ method }: WrapParams<any, any>) {
    return async (...args: any[]) => {
      const ret = await method(...args);
      return ret;
    };
  }
}
