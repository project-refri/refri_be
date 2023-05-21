import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserIngredientController } from './controllers/user-ingredient.controller';
import {
  UserIngredient,
  UserIngredientSchemaFactory,
} from './entities/user-ingredient.entity';
import { UserIngredientRepository } from './repositories/user-ingredient.repository';
import { UserIngredientService } from './services/user-ingredient.service';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: UserIngredient.name,
        useFactory: UserIngredientSchemaFactory,
        inject: [ConfigService],
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: 'IMAGE_PROCESS_SERVICE',
        useFactory: () => {
          return {
            transport: Transport.GRPC,
            options: {
              package: 'image_process',
              url: 'localhost:50051',
              protoPath: join(__dirname, '../../../image-process.proto'),
              loader: {
                keepCase: true,
              },
            },
          };
        },
      },
    ]),
  ],
  controllers: [UserIngredientController],
  providers: [UserIngredientService, UserIngredientRepository],
  exports: [UserIngredientService, UserIngredientRepository],
})
export class IngredientModule {}
