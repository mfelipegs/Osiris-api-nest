import { IsString, IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePancDto {
  @IsString()
  @IsNotEmpty()
  namePanc: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  cultivation: string[];

  @IsString()
  @IsNotEmpty()
  benefits: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsString()
  @IsNotEmpty()
  locale: string;
}
