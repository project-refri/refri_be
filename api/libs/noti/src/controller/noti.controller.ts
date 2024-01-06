import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { NotiService } from '../service/noti.service';
import { DeviceTokenService } from '../service/device-token.service';
import { CreateNotiDto, UpdateNotiDto } from '../dto/modify-noti.dto';
import {
  ApiDeleteNoContent,
  ApiGet,
  ApiPostCreated,
  ApiPostOk,
} from '@app/common/decorators/http-method.decorator';
import { Auth } from '@app/common/decorators/auth.decorator';
import {
  CreateNotiResponseDto,
  FindNotisResponseDto,
  FindOneNotiResponseDto,
  UpdateNotiResponseDto,
} from '../dto/noti-response.dto';
import { CreateDeviceTokenDto } from '../dto/modify-device-token.dto';
import { CreateDeviceTokenResponseDto } from '../dto/device-token-response.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReqUser } from '@app/common/decorators/req-user.decorator';
import { User } from '@app/user/entities/user.entity';

@ApiTags('Noti')
@Controller('noti')
export class NotiController {
  constructor(
    private readonly notiService: NotiService,
    private readonly deviceTokenService: DeviceTokenService,
  ) {}

  @Auth()
  @ApiPostCreated(CreateDeviceTokenResponseDto)
  @Post('device-token')
  async createDeviceToken(
    @Body() createDeviceTokenDto: CreateDeviceTokenDto,
    @ReqUser() user: User,
  ) {
    createDeviceTokenDto.userId = user.id;
    return await this.deviceTokenService.create(createDeviceTokenDto);
  }

  /**
   * For Testing. Don't Use this API in Production.
   */
  @Auth()
  @ApiPostCreated(CreateNotiResponseDto)
  @Post()
  async createNoti(@Body() createNotiDto: CreateNotiDto) {
    return await this.notiService.create(createNotiDto);
  }

  @Auth()
  @ApiGet(FindNotisResponseDto)
  @Get()
  async findAllNotis(@ReqUser() user: User) {
    return await this.notiService.findAll({
      userId: user.id,
    });
  }

  @Auth()
  @ApiGet(FindOneNotiResponseDto)
  @Get(':id')
  async findOneNoti(@Param('id', ParseIntPipe) id: number) {
    return await this.notiService.findOne(id);
  }

  @Auth()
  @ApiPostOk(UpdateNotiResponseDto)
  @Post(':id')
  async updateNoti(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNotiDto: UpdateNotiDto,
  ) {
    return await this.notiService.update(id, updateNotiDto);
  }

  @Auth()
  @ApiDeleteNoContent()
  @Delete(':id')
  async deleteNoti(@Param('id', ParseIntPipe) id: number) {
    return await this.notiService.deleteOne(id);
  }
}
