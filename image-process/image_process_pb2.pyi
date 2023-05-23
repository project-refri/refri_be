from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class BarcodeInfos(_message.Message):
    __slots__ = ["barcode_infos"]
    class BarcodeInfo(_message.Message):
        __slots__ = ["data", "orientation", "polygon", "quality", "rect", "type"]
        class Point(_message.Message):
            __slots__ = ["x", "y"]
            X_FIELD_NUMBER: _ClassVar[int]
            Y_FIELD_NUMBER: _ClassVar[int]
            x: int
            y: int
            def __init__(self, x: _Optional[int] = ..., y: _Optional[int] = ...) -> None: ...
        class Rect(_message.Message):
            __slots__ = ["height", "left", "top", "width"]
            HEIGHT_FIELD_NUMBER: _ClassVar[int]
            LEFT_FIELD_NUMBER: _ClassVar[int]
            TOP_FIELD_NUMBER: _ClassVar[int]
            WIDTH_FIELD_NUMBER: _ClassVar[int]
            height: int
            left: int
            top: int
            width: int
            def __init__(self, left: _Optional[int] = ..., top: _Optional[int] = ..., width: _Optional[int] = ..., height: _Optional[int] = ...) -> None: ...
        DATA_FIELD_NUMBER: _ClassVar[int]
        ORIENTATION_FIELD_NUMBER: _ClassVar[int]
        POLYGON_FIELD_NUMBER: _ClassVar[int]
        QUALITY_FIELD_NUMBER: _ClassVar[int]
        RECT_FIELD_NUMBER: _ClassVar[int]
        TYPE_FIELD_NUMBER: _ClassVar[int]
        data: str
        orientation: str
        polygon: _containers.RepeatedCompositeFieldContainer[BarcodeInfos.BarcodeInfo.Point]
        quality: int
        rect: BarcodeInfos.BarcodeInfo.Rect
        type: str
        def __init__(self, data: _Optional[str] = ..., type: _Optional[str] = ..., rect: _Optional[_Union[BarcodeInfos.BarcodeInfo.Rect, _Mapping]] = ..., polygon: _Optional[_Iterable[_Union[BarcodeInfos.BarcodeInfo.Point, _Mapping]]] = ..., orientation: _Optional[str] = ..., quality: _Optional[int] = ...) -> None: ...
    BARCODE_INFOS_FIELD_NUMBER: _ClassVar[int]
    barcode_infos: _containers.RepeatedCompositeFieldContainer[BarcodeInfos.BarcodeInfo]
    def __init__(self, barcode_infos: _Optional[_Iterable[_Union[BarcodeInfos.BarcodeInfo, _Mapping]]] = ...) -> None: ...

class ImageInfo(_message.Message):
    __slots__ = ["image_url"]
    IMAGE_URL_FIELD_NUMBER: _ClassVar[int]
    image_url: str
    def __init__(self, image_url: _Optional[str] = ...) -> None: ...
