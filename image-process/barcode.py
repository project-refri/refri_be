from urllib.request import urlopen
from PIL import Image
from pyzbar.pyzbar import decode


def barcode_read(url):
    img = Image.open(urlopen(url))
    print(img)

    detected_barcodes = decode(img)

    return detected_barcodes


if __name__ == '__main__':
    url = 'https://cdn.foodnews.co.kr/news/photo/201702/62159_17720_2312.jpg'
    print(barcode_read(url))
