import { Auth } from '@app/common/decorators/auth.decorator';
import {
  ApiDeleteNoContent,
  ApiGet,
  ApiPatch,
  ApiPostCreated,
} from '@app/common/decorators/http-method.decorator';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseEnumPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  CreateUserIngredientResponseDto,
  FindAllUserIngredientResponseDto,
  FindOneUserIngredientResponseDto,
  UpdateUserIngredientResponseDto,
} from '../dto/ingredient-response.dto';
import {
  CreateUserIngredientDto,
  UpdateUserIngredientDto,
} from '../dto/modify-ingredient.dto';
import { UserIngredientService } from '../services/user-ingredient.service';
import { FoodType } from '../types/food-type.enum';
import { StoreMethod } from '../types/store-method.enum';
import { FilterUserIngredientDto } from '../dto/filter-ingredient.dto';
import { queryBuilder } from '@app/common/utils/query-builder';
import { ReqUser } from '@app/common/decorators/req-user.decorator';
import { User } from '@app/user/entities/user.entity';

@ApiTags('Ingredient')
@Controller('ingredient')
export class UserIngredientController {
  constructor(private readonly ingredientService: UserIngredientService) {}

  /**
   * ## Create Ingredient
   *
   * Create a new ingredient with given dto.
   */
  @Auth()
  @ApiPostCreated(CreateUserIngredientResponseDto)
  @Post()
  async create(
    @Body() createIngredientDto: CreateUserIngredientDto,
    @ReqUser() user: User,
  ) {
    createIngredientDto.user_id = user.id.toString();
    return this.ingredientService.create(createIngredientDto);
  }

  /**
   * ## Find Ingredients
   *
   * Find all ingredients with given query.
   * #### Ingredient's user_id is request user's id by default.
   * If any query is not given, return all ingredients of request user's.
   */
  @ApiQuery({
    name: 'food_type',
    type: String,
    enum: FoodType,
    required: false,
  })
  @ApiQuery({
    name: 'store_method',
    type: String,
    enum: StoreMethod,
    required: false,
  })
  @Auth()
  @ApiGet(FindAllUserIngredientResponseDto)
  @Get()
  async findAll(
    @Query(
      'food_type',
      new DefaultValuePipe(FoodType.PROTEIN),
      new ParseEnumPipe(FoodType),
    )
    food_type: FoodType,
    @Query(
      'store_method',
      new DefaultValuePipe(StoreMethod.REFRIGERATE),
      new ParseEnumPipe(StoreMethod),
    )
    store_method: StoreMethod,
    @ReqUser() user: User,
  ) {
    const filterIngredientDto: FilterUserIngredientDto = queryBuilder({
      food_type,
      store_method,
      user_id: user.id.toString(),
    });
    return this.ingredientService.findAll(filterIngredientDto);
  }

  /**
   * ## Find one Ingredient
   *
   * Find one ingredient with given id.
   */
  @Auth()
  @ApiGet(FindOneUserIngredientResponseDto)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ingredientService.findOne(id);
  }

  /**
   * ## Update Ingredient
   *
   * Update ingredient with given id and dto.
   */
  @Auth()
  @ApiPatch(UpdateUserIngredientResponseDto)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateUserIngredientDto,
  ) {
    return this.ingredientService.update(id, updateIngredientDto);
  }

  /**
   * ## Delete Ingredient
   *
   * Delete ingredient with given id.
   */
  @Auth()
  @ApiDeleteNoContent()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.ingredientService.delete(id);
  }
}
