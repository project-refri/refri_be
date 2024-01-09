import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Recipe,
  RecipeSchema,
} from '@app/recipe/domain/mongo/mongo.recipe.entity';
import { RecipeService } from './services/recipe.service';
import { RecipeController } from './controllers/recipe.controller';
import { RecipeBookmarkController } from './controllers/recipe-bookmark.controller';
import { RecipeBookmarkService } from './services/recipe-bookmark.service';
import { RecipeBookmarkRepository } from './repositories/recipe-bookmark/recipe-bookmark.repository';
import { RecipeViewLogRepository } from './repositories/recipe-view-log/recipe-view-log.repository';
import { MongoRecipeRepository } from './repositories/recipe/mongo.recipe.repository';
import { RecipeRepository as PrismaRecipeRepository } from './repositories/recipe/recipe.repository';
import { UserModule } from '@app/user/user.module';

const PrismaRecipeRepositoryProvider: Provider = {
  provide: 'PrismaRecipeRepository',
  useClass: PrismaRecipeRepository,
};

const MongoRecipeRepositoryProvider: Provider = {
  provide: 'MongoRecipeRepository',
  useClass: MongoRecipeRepository,
};

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Recipe.name,
        useFactory: () => {
          const schema = RecipeSchema;
          return schema;
        },
      },
    ]),
    UserModule,
  ],
  controllers: [RecipeController, RecipeBookmarkController],
  providers: [
    RecipeService,
    PrismaRecipeRepositoryProvider,
    MongoRecipeRepositoryProvider,
    RecipeBookmarkService,
    RecipeBookmarkRepository,
    RecipeViewLogRepository,
  ],
  exports: [RecipeService, RecipeBookmarkService],
})
export class RecipeModule {}
