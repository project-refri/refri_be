// Original file: ../protos/image-process.proto


export interface _image_process_BarcodeInfos_BarcodeInfo {
  'data'?: (string);
  'type'?: (string);
  'rect'?: (_image_process_BarcodeInfos_BarcodeInfo_Rect | null);
  'polygon'?: (_image_process_BarcodeInfos_BarcodeInfo_Point)[];
  'orientation'?: (string);
  'quality'?: (number);
}

export interface _image_process_BarcodeInfos_BarcodeInfo__Output {
  'data': (string);
  'type': (string);
  'rect': (_image_process_BarcodeInfos_BarcodeInfo_Rect__Output | null);
  'polygon': (_image_process_BarcodeInfos_BarcodeInfo_Point__Output)[];
  'orientation': (string);
  'quality': (number);
}

export interface _image_process_BarcodeInfos_BarcodeInfo_Point {
  'x'?: (number);
  'y'?: (number);
}

export interface _image_process_BarcodeInfos_BarcodeInfo_Point__Output {
  'x': (number);
  'y': (number);
}

export interface _image_process_BarcodeInfos_BarcodeInfo_Rect {
  'left'?: (number);
  'top'?: (number);
  'width'?: (number);
  'height'?: (number);
}

export interface _image_process_BarcodeInfos_BarcodeInfo_Rect__Output {
  'left': (number);
  'top': (number);
  'width': (number);
  'height': (number);
}

export interface BarcodeInfos {
  'barcode_infos'?: (_image_process_BarcodeInfos_BarcodeInfo)[];
}

export interface BarcodeInfos__Output {
  'barcode_infos': (_image_process_BarcodeInfos_BarcodeInfo__Output)[];
}
