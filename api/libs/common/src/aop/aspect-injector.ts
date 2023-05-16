import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  DiscoveryService,
  MetadataScanner,
  ModuleRef,
  Reflector,
} from '@nestjs/core';
import { ASPECT, ASPECT_PROVIDER } from './aop.constants';
import { IAspectProvider } from './aop.interface';

export type AspectMetadata = {
  [ASPECT_PROVIDER]: any;
  [key: string]: any;
};

@Injectable()
export class AspectInjector implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
    private readonly moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    // const controllers = this.discoveryService.getControllers();
    const providers = this.discoveryService.getProviders();

    providers
      .filter((wrapper) => wrapper.isDependencyTreeStatic())
      .forEach(({ instance, metatype }) => {
        if (!instance || !metatype) {
          return false;
        }
        const aspectKeys = this.reflector.get<string[]>(ASPECT, metatype);
        if (aspectKeys) {
          const metadatas = aspectKeys.map((aspectKey) =>
            this.reflector.get(aspectKey, metatype),
          );

          this.metadataScanner
            .getAllMethodNames(instance)
            .forEach((methodName) => {
              Reflect.defineMetadata(ASPECT, aspectKeys, instance[methodName]);
              aspectKeys.forEach((aspectKey: string | symbol, idx: number) => {
                if (!this.reflector.get(aspectKey, instance[methodName]))
                  Reflect.defineMetadata(
                    aspectKey,
                    metadatas[idx],
                    instance[methodName],
                  );
              });
            });
        }
        this.metadataScanner
          .getAllMethodNames(Object.getPrototypeOf(instance))
          .map((methodName) => {
            const aspectKeys = this.reflector.get(ASPECT, instance[methodName]);
            if (!aspectKeys) {
              return null;
            }
            return {
              methodName,
              aspectKeys,
            };
          })
          .filter((item) => item !== null)
          .forEach(({ methodName, aspectKeys }) => {
            aspectKeys.forEach((aspectKey: string | symbol) => {
              const aspectMetadata: AspectMetadata = this.reflector.get(
                aspectKey,
                instance[methodName],
              );
              const aspectInstance = this.moduleRef.get<IAspectProvider>(
                aspectMetadata[ASPECT_PROVIDER],
                {
                  strict: false,
                },
              );

              if (!aspectInstance) {
                return;
              }
              // const wrapBinded = aspectInstance.wrap.bind(aspectInstance);
              const originalMethodBinded = instance[methodName].bind(instance);
              const wrappedMethod = aspectInstance.wrap({
                instance,
                methodName,
                method: originalMethodBinded,
                metadata: aspectMetadata,
              });

              Object.defineProperty(
                Object.getPrototypeOf(instance),
                methodName,
                {
                  ...Object.getOwnPropertyDescriptor(instance, methodName),
                  value: wrappedMethod,
                },
              );
            });
          });
      });
  }
}
