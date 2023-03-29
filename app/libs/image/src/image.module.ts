import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { ImageController } from './image.controller';

@Module({
  controllers: [ImageController],
  providers: [
    ImageService,
    {
      provide: S3Client,
      useFactory: (configService: ConfigService) => {
        return new S3Client({ region: configService.get('AWS_REGION') });
      },
      inject: [ConfigService],
    },
  ],
  exports: [
    ImageService,
    {
      provide: S3Client,
      useFactory: (configService: ConfigService) => {
        return new S3Client({ region: configService.get('AWS_REGION') });
      },
      inject: [ConfigService],
    },
  ],
})
export class ImageModule {}
