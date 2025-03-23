import { Module } from '@nestjs/common';
import { PredictionService } from './prediction.service';
import { PredictionController } from './prediction.controller';
import { CloudinaryModule } from 'nestjs-cloudinary';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Prediction, PredictionSchema } from './schemas/prediction.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    CloudinaryModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        cloud_name: configService.get<string>('CLOUDINARY_NAME'),
        api_key: configService.get<string>('CLOUDINARY_API_KEY'),
        api_secret: configService.get<string>('CLOUDINARY_SECRET'),
      }),
    }),
    MongooseModule.forFeature([
      { name: Prediction.name, schema: PredictionSchema },
    ]),
    HttpModule,
  ],
  controllers: [PredictionController],
  providers: [PredictionService],
})
export class PredictionModule {}
