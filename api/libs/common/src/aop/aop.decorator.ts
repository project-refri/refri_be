/* eslint-disable @typescript-eslint/ban-types */
import { applyDecorators } from '@nestjs/common';
import { ASPECT, ASPECT_PROVIDER } from './aop.constants';

export function extendArrayMetadata<T extends Array<unknown>>(
  key: string | symbol,
  metadata: T,
  target: Function,
) {
  const previousValue = Reflect.getMetadata(key, target) || [];
  const value = [...previousValue, ...metadata];
  Reflect.defineMetadata(key, value, target);
}

export function applyAspectDecorator(
  metadataKey: string | symbol,
  provider: any,
  key: string | symbol,
  metadata: any,
) {
  return applyDecorators(
    (target: any, _: string | symbol, descriptor: PropertyDescriptor) => {
      if (descriptor) {
        extendArrayMetadata(ASPECT, [metadataKey], descriptor.value);
      } else {
        extendArrayMetadata(ASPECT, [metadataKey], target);
      }
    },
    addAspectMetadata(metadataKey, ASPECT_PROVIDER, provider),
    addAspectMetadata(metadataKey, key, metadata),
  );
}

export function addAspectMetadata(
  metadataKey: string | symbol,
  key: string | symbol,
  metadata: any,
) {
  return (
    target: any,
    propertyKey?: string | symbol,
    descriptor?: PropertyDescriptor,
  ) => {
    if (descriptor) {
      const orginalMetadata =
        Reflect.getMetadata(metadataKey, descriptor.value) ?? {};
      orginalMetadata[key] = metadata;
      Reflect.defineMetadata(metadataKey, orginalMetadata, descriptor.value);
      return descriptor;
    }
    const orginalMetadata = Reflect.getMetadata(metadataKey, target) ?? {};
    orginalMetadata[key] = metadata;
    Reflect.defineMetadata(metadataKey, orginalMetadata, target);
    return target;
  };
}
