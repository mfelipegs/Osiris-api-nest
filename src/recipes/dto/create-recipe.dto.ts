import { Transform } from 'class-transformer';
import {
  IsString,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsMongoId,
} from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  nameRecipe: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsNotEmpty()
  @Transform(({ value }) => value ?? [])
  pancs: string;

  @IsArray()
  @IsNotEmpty()
  @Transform(({ value }) => value ?? [])
  ingredients: string;

  @IsArray()
  @IsNotEmpty()
  @Transform(({ value }) => value ?? [])
  preparation: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  locale: string;
}
