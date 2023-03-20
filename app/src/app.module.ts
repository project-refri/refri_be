import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { PostModule } from './post/post.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [UserModule, AuthModule, IngredientModule, PostModule, RecipeModule],
})
export class AppModule {}
