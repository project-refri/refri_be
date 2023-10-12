import {
  Aspect,
  LazyDecorator,
  WrapParams,
  createDecorator,
} from '@toss/nestjs-aop';
import { ClsService } from 'nestjs-cls';

export const LOG = Symbol('LOG');

export const Logable = () => createDecorator(LOG);

@Aspect(LOG)
export class LogDecorator implements LazyDecorator<any, any> {
  constructor(private readonly clsService: ClsService) {}

  wrap({ method, instance, methodName }: WrapParams<any, any>) {
    return async (...args: any[]) => {
      const reqId = this.clsService.getId();
      try {
        const t = Date.now();
        const ret = await method(...args);
        console.log(
          `[${reqId}] ${instance.constructor.name}.${methodName} executed in ${
            Date.now() - t
          }ms`,
        );
        return ret;
      } catch (e) {
        console.error(
          `[${reqId}] ${instance.constructor.name}.${methodName} error: ${e}`,
        );
        throw e;
      }
    };
  }
}
