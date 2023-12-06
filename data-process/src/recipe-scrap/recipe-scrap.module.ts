import { Module } from '@nestjs/common';
import { RecipeScrapService } from './recipe-scrap.service';
import { RecipeScrapController } from './recipe-scrap.controller';
import { WebAutomationModule } from 'src/web-automation/web-automation.module';
import { DataStructureModule } from 'src/data-structure/data-structure.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RecipeScrapRequest,
  RecipeScrapRequestSchema,
} from './entity/recipe-scrap-req.entity';
import { RecipeScrapRepository } from './recipe-scrap.repository';
import { HttpModule } from '@nestjs/axios';

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
    HttpModule,
  ],
  controllers: [RecipeScrapController],
  providers: [RecipeScrapService, RecipeScrapRepository],
  exports: [RecipeScrapService],
})
export class RecipeScrapModule {}
