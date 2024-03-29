import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import {
  CreateUserResponseDto,
  FindAllUserResponseDto,
  FindOneUserResponseDto,
  UpdateUserResponseDto,
  UserEmailDuplicateResponseDto,
  UserNameDuplicateResponseDto,
} from './dto/user-response.dto';
import {
  ApiDeleteNoContent,
  ApiGet,
  ApiPatch,
  ApiPostCreated,
} from '@app/common/decorators/http-method.decorator';
import { Auth } from '@app/common/decorators/auth.decorator';
import { UserDto } from '@app/user/dto/user.dto';
import { UpdateUserDto } from '@app/user/dto/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * ## Create User.
   *
   * Don't use this API endpoint in production. Only for development and testing.
   */
  @ApiPostCreated(
    CreateUserResponseDto,
    UserEmailDuplicateResponseDto,
    UserNameDuplicateResponseDto,
  )
  @Auth()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return UserDto.fromEntity(user);
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
    const users = await this.userService.findAll();
    return users.map((user) => UserDto.fromEntity(user));
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
    const user = await this.userService.findOne(id);
    return UserDto.fromEntity(user);
  }

  /**
   * ## Update User By ID
   *
   * Update user by `id` and return updated user info.
   */
  @Auth()
  @ApiPatch(UpdateUserResponseDto, UserNameDuplicateResponseDto)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.update(id, updateUserDto);
    return UserDto.fromEntity(user);
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
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.deleteOne(id);
    return UserDto.fromEntity(user);
  }
}
