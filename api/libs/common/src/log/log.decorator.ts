import { applyAspectDecorator } from '../aop/aop.decorator';
import { LogAspectProvider } from './log.aspect';

export const LOG_DECORATOR = Symbol('LOG_DECORATOR');
export const LOG_METADATA_KEY = Symbol('LOG_METADATA_KEY');

export const Logable = () =>
  applyAspectDecorator(LOG_DECORATOR, LogAspectProvider, LOG_METADATA_KEY, {});
