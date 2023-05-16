/* eslint-disable @typescript-eslint/ban-types */
export type WrapParams<T extends Function = Function, M = unknown> = {
  instance: any;
  methodName: string;
  method: T;
  metadata: M;
};

export interface IAspectProvider<T extends Function = Function, M = any> {
  wrap(params: WrapParams<T, M>): T;
}
