import {
  IsOptional,
  IsString,
  MinLength,
  IsNumber,
  IsPositive,
  IsBoolean,
} from 'class-validator';

export class UpdateDrinkDto {
  @IsOptional()
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @MinLength(3, { message: 'Le nom doit contenir au moins 3 caractères' })
  name?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Le prix doit être un nombre' })
  @IsPositive({ message: 'Le prix doit être strictement positif' })
  price?: number;

  @IsOptional()
  @IsString({ message: 'La taille doit être une chaîne de caractères' })
  size?: string;

  @IsOptional()
  @IsBoolean({ message: 'withAlcohol doit être un booléen' })
  withAlcohol?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'La disponibilité doit être un booléen' })
  available?: boolean;
}
