import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataStructureModule } from './data-structure/data-structure.module';
import { RecipeModule } from './recipe/recipe.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { WebAutomationModule } from './web-automation/web-automation.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeScrapModule } from './recipe-scrap/recipe-scrap.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    DataStructureModule,
    WebAutomationModule,
    RecipeModule,
    IngredientModule,
    RecipeScrapModule,
  ],
  providers: [],
})
export class AppModule {}
