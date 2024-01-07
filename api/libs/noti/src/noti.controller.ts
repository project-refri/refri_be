import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { NotiService } from './service/noti.service';
import { DeviceTokenService } from './service/device-token.service';
import { CreateNotiDto, UpdateNotiDto } from './dto/modify-noti.dto';
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
} from './dto/noti-response.dto';
import { CreateDeviceTokenDto } from './dto/modify-device-token.dto';
import { CreateDeviceTokenResponseDto } from './dto/device-token-response.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReqUser } from '@app/common/decorators/req-user.decorator';
import { User } from '@app/user/domain/user.entity';
import { DeviceTokenDto } from '@app/noti/dto/device-token.dto';
import { NotiDto } from '@app/noti/dto/noti.dto';

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
    const deviceToken = await this.deviceTokenService.create(
      createDeviceTokenDto,
    );
    return DeviceTokenDto.from(deviceToken);
  }

  /**
   * For Testing. Don't Use this API in Production.
   */
  @Auth()
  @ApiPostCreated(CreateNotiResponseDto)
  @Post()
  async createNoti(@Body() createNotiDto: CreateNotiDto) {
    const noti = await this.notiService.create(createNotiDto);
    return NotiDto.from(noti);
  }

  @Auth()
  @ApiGet(FindNotisResponseDto)
  @Get()
  async findAllNotis(@ReqUser() user: User) {
    const notis = await this.notiService.findAll({
      userId: user.id,
    });
    return notis.map((noti) => NotiDto.from(noti));
  }

  @Auth()
  @ApiGet(FindOneNotiResponseDto)
  @Get(':id')
  async findOneNoti(@Param('id', ParseIntPipe) id: number) {
    const noti = await this.notiService.findOne(id);
    return NotiDto.from(noti);
  }

  @Auth()
  @ApiPostOk(UpdateNotiResponseDto)
  @Post(':id')
  async updateNoti(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNotiDto: UpdateNotiDto,
  ) {
    const noti = await this.notiService.update(id, updateNotiDto);
    return NotiDto.from(noti);
  }

  @Auth()
  @ApiDeleteNoContent()
  @Delete(':id')
  async deleteNoti(@Param('id', ParseIntPipe) id: number) {
    return await this.notiService.deleteOne(id);
  }
}
