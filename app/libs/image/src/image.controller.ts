import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { UploadImageDto, UploadImageResponseDto } from './image.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Auth } from '@app/common/decorators/auth.decorator';
import { ApiPostOk } from '@app/common/decorators/http-method.decorator';

@ApiTags('Image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  /**
   * ## Image Upload
   *
   * Upload image to S3
   * Post image with multipart/form-data
   */
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadImageDto,
  })
  @UseInterceptors(FileInterceptor('image'))
  @ApiPostOk(UploadImageResponseDto)
  @Auth()
  @HttpCode(HttpStatus.OK)
  @Post('upload')
  async uploadImage(
    @UploadedFile() image: Express.Multer.File,
    @Body() uploadImageDto: UploadImageDto,
  ) {
    return await this.imageService.uploadImage({
      ...uploadImageDto,
      image,
    });
  }
}
