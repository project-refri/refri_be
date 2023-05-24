import os
import dotenv
from concurrent import futures
import logging

import grpc
import image_process_pb2
import image_process_pb2_grpc

from urllib.request import urlopen
from PIL import Image
from pyzbar.pyzbar import decode
import jwt

dotenv.load_dotenv('.env.dev')
jwt_secret = os.getenv('JWT_SECRET')
port = os.getenv('PORT')


def get_barcode_info_from_url(url: str) -> list:
    img = Image.open(urlopen(url))

    detected_barcodes = decode(img)

    return image_process_pb2.BarcodeInfos(barcode_infos=list(map(lambda barcode_info: image_process_pb2.BarcodeInfos.BarcodeInfo(
        data=barcode_info.data.decode('utf-8'),
        type=barcode_info.type,
        rect=image_process_pb2.BarcodeInfos.BarcodeInfo.Rect(left=barcode_info.rect.left,
                                                             top=barcode_info.rect.top,
                                                             width=barcode_info.rect.width,
                                                             height=barcode_info.rect.height),
        polygon=list(map(lambda point: image_process_pb2.BarcodeInfos.BarcodeInfo.Point(
            x=point.x, y=point.y), barcode_info.polygon)),
        orientation=barcode_info.orientation,
        quality=barcode_info.quality
    ), detected_barcodes)))


class ImageProcessServicer(image_process_pb2_grpc.ImageProcessServicer):
    def __init__(self):
        pass

    def GetBarcodeInfoFromUrl(self, request, context):
        token = None
        for key, value in context.invocation_metadata():
            try:
                if key.lower() == 'authorization':
                    token = jwt.decode(value, jwt_secret, algorithms=['HS256'])
            except:
                context.abort(grpc.StatusCode.UNAUTHENTICATED,
                              'Invalid jwt token')
                return None
        if token is None:
            context.abort(grpc.StatusCode.UNAUTHENTICATED, 'No jwt token')
            return None

        barcode_infos = get_barcode_info_from_url(request.image_url)

        if len(barcode_infos.barcode_infos) == 0:
            return None
        return barcode_infos


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    image_process_pb2_grpc.add_ImageProcessServicer_to_server(
        ImageProcessServicer(), server)
    server.add_insecure_port('[::]:{}'.format(port))
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig()
    serve()
