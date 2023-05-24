import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { ImageProcessClient as _image_process_ImageProcessClient, ImageProcessDefinition as _image_process_ImageProcessDefinition } from './image_process/ImageProcess';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  image_process: {
    BarcodeInfos: MessageTypeDefinition
    ImageInfo: MessageTypeDefinition
    ImageProcess: SubtypeConstructor<typeof grpc.Client, _image_process_ImageProcessClient> & { service: _image_process_ImageProcessDefinition }
  }
}

