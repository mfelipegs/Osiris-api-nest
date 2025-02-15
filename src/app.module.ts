import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PancsModule } from './pancs/pancs.module';
import { RecipesModule } from './recipes/recipes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PancsModule,
    RecipesModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/osiris-nest'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
