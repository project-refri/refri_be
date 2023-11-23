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
import { CrudService } from '@app/common/crud.service';

interface ImageProcessService {
  getBarcodeInfoFromUrl(
    imageInfo: { image_url: string },
    metadata: Metadata,
  ): Observable<BarcodeInfos>;
}

@Injectable()
export class UserIngredientService
  extends CrudService<
    UserIngredient,
    CreateUserIngredientDto,
    UpdateUserIngredientDto,
    FilterUserIngredientDto
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
}
