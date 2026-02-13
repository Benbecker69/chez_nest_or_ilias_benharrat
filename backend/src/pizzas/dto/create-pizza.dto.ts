import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsNumber,
  IsPositive,
  IsArray,
  ArrayMinSize,
  IsBoolean,
} from 'class-validator';

export class CreatePizzaDto {
  @IsNotEmpty({ message: 'Le nom de la pizza est requis' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @MinLength(3, { message: 'Le nom doit contenir au moins 3 caractères' })
  name: string;

  @IsNotEmpty({ message: 'Le prix est requis' })
  @IsNumber({}, { message: 'Le prix doit être un nombre' })
  @IsPositive({ message: 'Le prix doit être strictement positif' })
  price: number;

  @IsNotEmpty({ message: 'Les ingrédients sont requis' })
  @IsArray({ message: 'Les ingrédients doivent être un tableau' })
  @ArrayMinSize(1, { message: 'La pizza doit contenir au moins un ingrédient' })
  @IsString({ each: true, message: 'Chaque ingrédient doit être une chaîne de caractères' })
  ingredients: string[];

  @IsNotEmpty({ message: 'La disponibilité est requise' })
  @IsBoolean({ message: 'La disponibilité doit être un booléen' })
  available: boolean;
}
