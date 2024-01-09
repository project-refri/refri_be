import { Metadata } from '@grpc/grpc-js';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientGrpc } from '@nestjs/microservices';
import { BarcodeInfos } from '../../../proto/image_process/BarcodeInfos';
import { lastValueFrom, Observable } from 'rxjs';
import { CreateUserIngredientDto } from './dto/create-user-ingredient.dto';
import { UserIngredientEntity } from './domain/user-ingredient.entity';
import { UserIngredientRepository } from './repositories/user-ingredient.repository';
import { CrudService } from '@app/common/crud.service';
import { UpdateUserIngredientDto } from '@app/ingredient/dto/update-user-ingredient.dto';
import { FilterUserIngredientDto } from '@app/ingredient/dto/filter-ingredient.dto';

interface ImageProcessService {
  getBarcodeInfoFromUrl(
    imageInfo: { image_url: string },
    metadata: Metadata,
  ): Observable<BarcodeInfos>;
}

@Injectable()
export class UserIngredientService
  extends CrudService<
    UserIngredientEntity,
    CreateUserIngredientDto,
    UpdateUserIngredientDto
  >
  implements OnModuleInit
{
  private imageProcessService: ImageProcessService;

  constructor(
    private readonly userIngredientRepository: UserIngredientRepository,
    private readonly jwtService: JwtService,
    @Inject('IMAGE_PROCESS_SERVICE') private readonly client: ClientGrpc,
  ) {
    super(userIngredientRepository);
  }

  onModuleInit() {
    this.imageProcessService =
      this.client.getService<ImageProcessService>('ImageProcess');
  }

  async findAllByCond(filterUserIngredientDto: FilterUserIngredientDto) {
    return this.userIngredientRepository.findAllByCond(filterUserIngredientDto);
  }

  async getIngredientInfoFromBarcode(
    getIngredientInfoDto: { imageUrl: string },
    cred: string,
  ) {
    const metadata = new Metadata();
    metadata.add('Authorization', `${cred.split(' ')[1]}`);

    const ret = await lastValueFrom(
      this.imageProcessService.getBarcodeInfoFromUrl(
        {
          image_url: getIngredientInfoDto.imageUrl,
        },
        metadata,
      ),
    );
    return ret;
  }
}
