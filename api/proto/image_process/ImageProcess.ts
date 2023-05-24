// Original file: ../protos/image-process.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { BarcodeInfos as _image_process_BarcodeInfos, BarcodeInfos__Output as _image_process_BarcodeInfos__Output } from '../image_process/BarcodeInfos';
import type { ImageInfo as _image_process_ImageInfo, ImageInfo__Output as _image_process_ImageInfo__Output } from '../image_process/ImageInfo';

export interface ImageProcessClient extends grpc.Client {
  GetBarcodeInfoFromUrl(argument: _image_process_ImageInfo, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_image_process_BarcodeInfos__Output>): grpc.ClientUnaryCall;
  GetBarcodeInfoFromUrl(argument: _image_process_ImageInfo, metadata: grpc.Metadata, callback: grpc.requestCallback<_image_process_BarcodeInfos__Output>): grpc.ClientUnaryCall;
  GetBarcodeInfoFromUrl(argument: _image_process_ImageInfo, options: grpc.CallOptions, callback: grpc.requestCallback<_image_process_BarcodeInfos__Output>): grpc.ClientUnaryCall;
  GetBarcodeInfoFromUrl(argument: _image_process_ImageInfo, callback: grpc.requestCallback<_image_process_BarcodeInfos__Output>): grpc.ClientUnaryCall;
  getBarcodeInfoFromUrl(argument: _image_process_ImageInfo, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_image_process_BarcodeInfos__Output>): grpc.ClientUnaryCall;
  getBarcodeInfoFromUrl(argument: _image_process_ImageInfo, metadata: grpc.Metadata, callback: grpc.requestCallback<_image_process_BarcodeInfos__Output>): grpc.ClientUnaryCall;
  getBarcodeInfoFromUrl(argument: _image_process_ImageInfo, options: grpc.CallOptions, callback: grpc.requestCallback<_image_process_BarcodeInfos__Output>): grpc.ClientUnaryCall;
  getBarcodeInfoFromUrl(argument: _image_process_ImageInfo, callback: grpc.requestCallback<_image_process_BarcodeInfos__Output>): grpc.ClientUnaryCall;
  
}

export interface ImageProcessHandlers extends grpc.UntypedServiceImplementation {
  GetBarcodeInfoFromUrl: grpc.handleUnaryCall<_image_process_ImageInfo__Output, _image_process_BarcodeInfos>;
  
}

export interface ImageProcessDefinition extends grpc.ServiceDefinition {
  GetBarcodeInfoFromUrl: MethodDefinition<_image_process_ImageInfo, _image_process_BarcodeInfos, _image_process_ImageInfo__Output, _image_process_BarcodeInfos__Output>
}
