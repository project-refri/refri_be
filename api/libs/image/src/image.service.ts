import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { v4 as uuid4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { ImageUrlDto, UploadImageDto } from './image.dto';

@Injectable()
export class ImageService {
  constructor(
    private readonly s3Client: S3Client,
    private readonly configService: ConfigService,
  ) {}

  async uploadImage(uploadImageDto: UploadImageDto): Promise<ImageUrlDto> {
    const { domain, image } = uploadImageDto;
    const imageKey = domain.toString() + '-' + uuid4() + '.jpg';
    const params: PutObjectCommandInput = {
      Bucket: this.configService.get<string>('AWS_S3_IMAGE_MAIN_BUCKET'),
      ACL: 'public-read',
      Key: imageKey,
      Body: image.buffer,
    };
    const ret = await this.s3Client.send(new PutObjectCommand(params));
    return {
      url: `https://${this.configService.get<string>(
        'AWS_S3_IMAGE_MAIN_BUCKET',
      )}.s3.amazonaws.com/${imageKey}`,
    };
  }
}
