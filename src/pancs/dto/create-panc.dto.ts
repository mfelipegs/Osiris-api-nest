import { IsString, IsArray, IsNotEmpty } from 'class-validator';

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

  @IsString()
  image: string;

  @IsString()
  @IsNotEmpty()
  locale: string;
}
