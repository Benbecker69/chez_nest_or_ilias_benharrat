import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsNumber,
  IsPositive,
  IsBoolean,
} from 'class-validator';

export class CreateDessertDto {
  @IsNotEmpty({ message: 'Le nom du dessert est requis' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @MinLength(3, { message: 'Le nom doit contenir au moins 3 caractères' })
  name: string;

  @IsNotEmpty({ message: 'Le prix est requis' })
  @IsNumber({}, { message: 'Le prix doit être un nombre' })
  @IsPositive({ message: 'Le prix doit être strictement positif' })
  price: number;

  @IsNotEmpty({ message: 'La disponibilité est requise' })
  @IsBoolean({ message: 'La disponibilité doit être un booléen' })
  available: boolean;
}
