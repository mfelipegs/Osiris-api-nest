import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PancsModule } from './pancs/pancs.module';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    PancsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/osiris-nest'),
    RecipesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
