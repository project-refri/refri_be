import { Metadata } from '@grpc/grpc-js';
import {
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientGrpc } from '@nestjs/microservices';
import { BarcodeInfos } from 'proto/image_process/BarcodeInfos';
import { lastValueFrom, Observable } from 'rxjs';
import { FilterUserIngredientDto } from '../dto/filter-ingredient.dto';
import {
  CreateUserIngredientDto,
  UpdateUserIngredientDto,
} from '../dto/modify-ingredient.dto';
import { UserIngredient } from '../entities/user-ingredient.entity';
import { UserIngredientRepository } from '../repositories/user-ingredient.repository';
import { MongoTransactional } from '@app/common/transaction/mongo-transaction.service';

interface ImageProcessService {
  getBarcodeInfoFromUrl(
    imageInfo: { image_url: string },
    metadata: Metadata,
  ): Observable<BarcodeInfos>;
}

@Injectable()
export class UserIngredientService implements OnModuleInit {
  private imageProcessService: ImageProcessService;
  constructor(
    private readonly userIngredientRepository: UserIngredientRepository,
    private readonly jwtService: JwtService,
    @Inject('IMAGE_PROCESS_SERVICE') private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.imageProcessService =
      this.client.getService<ImageProcessService>('ImageProcess');
  }

  async getIngredientInfoFromBarcode(
    getIngredientInfoDto: { image_url: string },
    cred: string,
  ) {
    const metadata = new Metadata();
    metadata.add('Authorization', `${cred.split(' ')[1]}`);

    const ret = await lastValueFrom(
      this.imageProcessService.getBarcodeInfoFromUrl(
        {
          image_url: getIngredientInfoDto.image_url,
        },
        metadata,
      ),
    );
    return ret;
  }

  @MongoTransactional()
  async create(
    createUserIngredientDto: CreateUserIngredientDto,
  ): Promise<UserIngredient> {
    return await this.userIngredientRepository.create(createUserIngredientDto);
  }

  @MongoTransactional({ readOnly: true })
  async findAll(
    filterUserIngredientDto: FilterUserIngredientDto,
  ): Promise<UserIngredient[]> {
    return await this.userIngredientRepository.findAll(filterUserIngredientDto);
  }

  @MongoTransactional({ readOnly: true })
  async findOne(id: string): Promise<UserIngredient> {
    const ret = await this.userIngredientRepository.findOne(id);
    if (!ret) throw new NotFoundException('UserIngredient not found');
    return ret;
  }

  @MongoTransactional()
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

  @MongoTransactional()
  async deleteOne(id: string): Promise<UserIngredient> {
    const ret = await this.userIngredientRepository.deleteOne(id);
    if (!ret) throw new NotFoundException('UserIngredient not found');
    return ret;
  }

  @MongoTransactional()
  async deleteAll(
    filterUserIngredientDto: FilterUserIngredientDto,
  ): Promise<any> {
    return await this.userIngredientRepository.deleteAll(
      filterUserIngredientDto,
    );
  }
}
