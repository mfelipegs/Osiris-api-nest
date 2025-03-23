import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PancsModule } from './pancs/pancs.module';
import { RecipesModule } from './recipes/recipes.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PredictionModule } from './prediction/prediction.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PancsModule,
    RecipesModule,
    UsersModule,
    AuthModule,
    PredictionModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>(
          'MONGO_URI',
          'mongodb://localhost:27017/osiris-nest',
        ),
      }),
    }),
  ],
})
export class AppModule {}
