import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsStrongPassword,
  IsBoolean,
  IsDateString,
  ValidateNested,
} from 'class-validator';

class SubscriptionDto {
  @IsBoolean()
  @Transform(({ value }) => value ?? false)
  active: boolean;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nameUser: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @IsArray()
  @Transform(({ value }) => value ?? [])
  favoritePancsIds: string[];

  @IsArray()
  @Transform(({ value }) => value ?? [])
  favoriteRecipesIds: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => SubscriptionDto)
  subscription?: SubscriptionDto;
}
