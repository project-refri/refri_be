import {
  Controller,
  Body,
  Param,
  Post,
  HttpCode,
  Get,
  Patch,
  HttpStatus,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from '../dto/modify-user.dto';
import { UserService } from '../services/user.service';
import {
  CreateUserResponseDto,
  FindAllUserResponseDto,
  FindOneUserResponseDto,
  UpdateUserResponseDto,
} from '../dto/user-response.dto';
import {
  ApiDeleteNoContent,
  ApiGet,
  ApiPatch,
  ApiPostCreated,
} from '@app/common/decorators/http-method.decorator';
import { Auth } from '@app/common/decorators/auth.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * ## Create User.
   *
   * Don't use this API endpoint in production. Only for development and testing.
   */
  @ApiPostCreated(CreateUserResponseDto)
  @Auth()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  /**
   * ## Find all Users
   *
   * TODO: add Query params for pagination and filtering
   */
  @Auth()
  @ApiGet(FindAllUserResponseDto)
  @Get()
  async findAll() {
    return await this.userService.findAll({});
  }

  /**
   * ## Find one User By ID
   *
   * Find one user by `id` and return user info.
   */
  @Auth()
  @ApiGet(FindOneUserResponseDto)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne(id);
  }

  /**
   * ## Update User By ID
   *
   * Update user by `id` and return updated user info.
   */
  @Auth()
  @ApiPatch(UpdateUserResponseDto)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(id, updateUserDto);
  }

  /**
   * ## Delete User By ID
   *
   * Don't use this API endpoint in production. Only for development and testing.
   *
   * TODO: add cascade delete
   */
  @Auth()
  @ApiDeleteNoContent()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteOne(id);
  }
}
