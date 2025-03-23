import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsMongoId,
  IsEnum,
  IsDate,
  IsNumber,
} from 'class-validator';
import { Types } from 'mongoose';
import { PredictionStatus } from '../enums/prediction-status';

export class CreatePredictionDto {
  @IsString()
  @IsOptional()
  image: string;

  @IsDate()
  @IsOptional()
  date?: Date;

  @IsEnum(PredictionStatus)
  @IsNotEmpty()
  status: PredictionStatus;

  @IsMongoId()
  @IsNotEmpty()
  userId: Types.ObjectId;

  @IsNumber()
  @IsOptional()
  accuracy: number;

  @IsString()
  @IsOptional()
  class: string;
}
