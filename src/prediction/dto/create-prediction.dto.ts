import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsMongoId,
  IsEnum,
  IsDate,
} from 'class-validator';
import { Types } from 'mongoose';

export enum PredictionStatus {
  PENDING = 'pending',
  PROCESSED = 'processed',
  FAILED = 'failed',
}

export class CreatePredictionDto {
  @IsString()
  @IsNotEmpty()
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
}
