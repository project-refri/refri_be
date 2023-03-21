import { Controller, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  Delete,
  Get,
  Patch,
  Post,
} from '../../commmon/decorators/http-method.decorator';
import { CreateUserDto, UpdateUserDto } from '../dto/modify-user.dto';
import { UserService } from '../services/user.service';
import {
  CreateUserResponseDto,
  FindAllUserResponseDto,
  FindOneUserResponseDto,
  UpdateUserResponseDto,
} from '../dto/user-response.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Create User.
   *
   * Don't use this API endpoint in production. Only for development and testing.
   */
  @Post(CreateUserResponseDto)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  /**
   * Find all Users
   *
   * TODO: add Query params for pagination and filtering
   */
  @Get(FindAllUserResponseDto)
  async findAll() {
    return await this.userService.findAll({});
  }

  /**
   * Find one User By ID
   */
  @Get(FindOneUserResponseDto, ':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  /**
   * Update User By ID
   */
  @Patch(UpdateUserResponseDto, ':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  /**
   * Delete User By ID
   *
   * Don't use this API endpoint in production. Only for development and testing.
   *
   * TODO: add cascade delete
   */
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
