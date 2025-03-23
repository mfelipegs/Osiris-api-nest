import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { PredictionService } from './prediction.service';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'nestjs-cloudinary';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PredictionStatus } from './enums/prediction-status';
import { AuthGuard } from 'src/auth/guards/auth.guard';

interface AIPredictionResponse {
  classe: string;
  acuracia: number;
}

@Controller('prediction')
export class PredictionController {
  constructor(
    private readonly predictionService: PredictionService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly httpService: HttpService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createPredictionDto: CreatePredictionDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const uploadedImage = await this.cloudinaryService.uploadFile(file);

      createPredictionDto.image = uploadedImage.url;

      const aiResponse = await firstValueFrom(
        this.httpService.post<AIPredictionResponse>(
          'http://localhost:5000/predict',
          {
            imagem: uploadedImage.url,
          },
        ),
      );

      if (aiResponse.status === 200 && aiResponse.data) {
        createPredictionDto.status = PredictionStatus.PROCESSED;
        createPredictionDto.class = aiResponse.data.classe;
        createPredictionDto.accuracy = aiResponse.data.acuracia;
      } else {
        createPredictionDto.status = PredictionStatus.FAILED;
        await this.predictionService.create(createPredictionDto);
        throw new InternalServerErrorException('Error processing image.');
      }

      return this.predictionService.create(createPredictionDto);
    } catch (error) {
      console.error('Error on requesting AI API', error);
      createPredictionDto.status = PredictionStatus.FAILED;
      await this.predictionService.create(createPredictionDto);
      throw new InternalServerErrorException('Error processing image.');
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.predictionService.findAll();
  }
}
