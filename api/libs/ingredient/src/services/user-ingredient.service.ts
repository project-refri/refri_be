import { Logable } from '@app/common/log/log.decorator';
import {
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom, map, Observable } from 'rxjs';
import { FilterUserIngredientDto } from '../dto/filter-ingredient.dto';
import {
  CreateUserIngredientDto,
  UpdateUserIngredientDto,
} from '../dto/modify-ingredient.dto';
import { UserIngredient } from '../entities/user-ingredient.entity';
import { UserIngredientRepository } from '../repositories/user-ingredient.repository';

interface ImageProcessService {
  getBarcodeInfoFromUrl(imageInfo: { image_url: string }): Observable<any>;
}

@Logable()
@Injectable()
export class UserIngredientService implements OnModuleInit {
  private imageProcessService: ImageProcessService;
  constructor(
    private readonly userIngredientRepository: UserIngredientRepository,
    @Inject('IMAGE_PROCESS_SERVICE') private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.imageProcessService =
      this.client.getService<ImageProcessService>('ImageProcess');
  }

  getIngredientInfoFromImage(imageUrl: string) {
    console.log('image_url: ', imageUrl);
    const ret = this.imageProcessService.getBarcodeInfoFromUrl({
      image_url: imageUrl,
    });
    console.log('ret: ', ret);
    return ret;
  }

  async create(
    createUserIngredientDto: CreateUserIngredientDto,
  ): Promise<UserIngredient> {
    return await this.userIngredientRepository.create(createUserIngredientDto);
  }

  async findAll(
    filterUserIngredientDto: FilterUserIngredientDto,
  ): Promise<UserIngredient[]> {
    return await this.userIngredientRepository.findAll(filterUserIngredientDto);
  }

  async findOne(id: string): Promise<UserIngredient> {
    const ret = await this.userIngredientRepository.findOne(id);
    if (!ret) throw new NotFoundException('UserIngredient not found');
    return ret;
  }

  async update(
    id: string,
    updateUserIngredientDto: UpdateUserIngredientDto,
  ): Promise<UserIngredient> {
    const ret = await this.userIngredientRepository.update(
      id,
      updateUserIngredientDto,
    );
    if (!ret) throw new NotFoundException('UserIngredient not found');
    return ret;
  }

  async deleteOne(id: string): Promise<UserIngredient> {
    const ret = await this.userIngredientRepository.deleteOne(id);
    if (!ret) throw new NotFoundException('UserIngredient not found');
    return ret;
  }

  async deleteAll(
    filterUserIngredientDto: FilterUserIngredientDto,
  ): Promise<any> {
    return await this.userIngredientRepository.deleteAll(
      filterUserIngredientDto,
    );
  }
}
