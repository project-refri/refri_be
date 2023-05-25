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
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import * as grpc from '@grpc/grpc-js';

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
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.GRPC,
            options: {
              package: 'image_process',
              url: configService.get<string>('IMAGE_PROCESS_SERVICE_URL'),
              protoPath: join(__dirname, './image-process.proto'),
              loader: {
                keepCase: true,
              },
              credentials: grpc.credentials.createSsl(),
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [UserIngredientController],
  providers: [UserIngredientService, UserIngredientRepository],
  exports: [UserIngredientService, UserIngredientRepository],
})
export class IngredientModule {}
