import { CreateUserDto } from '../../users/dto/create-user.dto';
import { IsOptional } from 'class-validator';

export class SignupDto extends CreateUserDto {
  @IsOptional()
  favoritePancsIds: string[] = [];

  @IsOptional()
  favoriteRecipesIds: string[] = [];

  @IsOptional()
  image: string;
}
