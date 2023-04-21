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

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: UserIngredient.name,
        useFactory: UserIngredientSchemaFactory,
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [UserIngredientController],
  providers: [UserIngredientService, UserIngredientRepository],
  exports: [UserIngredientService, UserIngredientRepository],
})
export class IngredientModule {}
