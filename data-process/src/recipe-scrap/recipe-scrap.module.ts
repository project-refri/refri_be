import { Module } from '@nestjs/common';
import { RecipeScrapService } from './recipe-scrap.service';
import { RecipeScrapController } from './recipe-scrap.controller';
import { WebAutomationModule } from 'src/web-automation/web-automation.module';
import { DataStructureModule } from 'src/data-structure/data-structure.module';
import { RecipeModule } from 'src/recipe/recipe.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RecipeScrapRequest,
  RecipeScrapRequestSchema,
} from './entity/recipe-scrap-req.entity';
import { RecipeScrapRepository } from './recipe-scrap.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RecipeScrapRequest.name,
        schema: RecipeScrapRequestSchema,
      },
    ]),
    WebAutomationModule,
    DataStructureModule,
    RecipeModule,
  ],
  controllers: [RecipeScrapController],
  providers: [RecipeScrapService, RecipeScrapRepository],
  exports: [RecipeScrapService],
})
export class RecipeScrapModule {}
