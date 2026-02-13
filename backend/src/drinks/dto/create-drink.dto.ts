import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsNumber,
  IsPositive,
  IsBoolean,
} from 'class-validator';

export class CreateDrinkDto {
  @IsNotEmpty({ message: 'Le nom de la boisson est requis' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @MinLength(3, { message: 'Le nom doit contenir au moins 3 caractères' })
  name: string;

  @IsNotEmpty({ message: 'Le prix est requis' })
  @IsNumber({}, { message: 'Le prix doit être un nombre' })
  @IsPositive({ message: 'Le prix doit être strictement positif' })
  price: number;

  @IsNotEmpty({ message: 'La taille est requise' })
  @IsString({ message: 'La taille doit être une chaîne de caractères' })
  size: string;

  @IsNotEmpty({ message: 'Le champ withAlcohol est requis' })
  @IsBoolean({ message: 'withAlcohol doit être un booléen' })
  withAlcohol: boolean;

  @IsNotEmpty({ message: 'La disponibilité est requise' })
  @IsBoolean({ message: 'La disponibilité doit être un booléen' })
  available: boolean;
}
