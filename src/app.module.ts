import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PancsModule } from './pancs/pancs.module';
import { RecipesModule } from './recipes/recipes.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import 'dotenv/config';

@Module({
  imports: [
    PancsModule,
    RecipesModule,
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/osiris-nest',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
