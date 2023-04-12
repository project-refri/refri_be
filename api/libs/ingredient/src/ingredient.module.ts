import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientController } from './controllers/ingredient.controller';
import {
  Ingredient,
  IngredientSchemaFactory,
} from './entities/ingredient.entity';
import { IngredientRepository } from './repositories/ingredient.repository';
import { IngredientService } from './services/ingredient.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Ingredient.name,
        useFactory: IngredientSchemaFactory,
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [IngredientController],
  providers: [IngredientService, IngredientRepository],
  exports: [IngredientService, IngredientRepository],
})
export class IngredientModule {}
