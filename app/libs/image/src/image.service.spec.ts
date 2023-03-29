import { ImageService } from './image.service';
import { TestBed } from '@automock/jest';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { ImageDomain } from './image-domain.enum';
import { v4 as uuid4 } from 'uuid';

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('test-uuid'),
}));

describe('ImageService', () => {
  let service: ImageService;
  let s3Client: jest.Mocked<S3Client>;
  let configService: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ImageService).compile();

    service = unit;
    s3Client = unitRef.get(S3Client);
    configService = unitRef.get(ConfigService);
  });

  describe('uploadImage', () => {
    it('should upload an image to S3 and return its URL', async () => {
      const domain: ImageDomain = ImageDomain.DEFAULT;
      const image: Express.Multer.File = {
        buffer: Buffer.from('test image'),
        mimetype: 'image/jpeg',
        size: 100,
        fieldname: '',
        originalname: '',
        encoding: '',
        stream: '' as any,
        destination: '',
        filename: '',
        path: '',
      };
      const params: PutObjectCommandInput = {
        Bucket: 'test-bucket',
        ACL: 'public-read',
        Key: domain.toString() + '-' + uuid4() + '.jpg',
        Body: image.buffer,
      };
      configService.get.mockReturnValue('test-bucket');

      const result = await service.uploadImage({ domain, image });

      expect(s3Client.send).toHaveBeenCalledWith(expect.any(PutObjectCommand));
      expect(configService.get).toHaveBeenCalledWith(
        'AWS_S3_IMAGE_MAIN_BUCKET',
      );
      expect(result).toEqual({
        url: expect.stringContaining(ImageDomain.DEFAULT + '-'),
      });
    });
  });
});
