import {
  IsOptional,
  IsString,
  MinLength,
  IsNumber,
  IsPositive,
  IsArray,
  ArrayMinSize,
  IsBoolean,
} from 'class-validator';

export class UpdatePizzaDto {
  @IsOptional()
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @MinLength(3, { message: 'Le nom doit contenir au moins 3 caractères' })
  name?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Le prix doit être un nombre' })
  @IsPositive({ message: 'Le prix doit être strictement positif' })
  price?: number;

  @IsOptional()
  @IsArray({ message: 'Les ingrédients doivent être un tableau' })
  @ArrayMinSize(1, { message: 'La pizza doit contenir au moins un ingrédient' })
  @IsString({ each: true, message: 'Chaque ingrédient doit être une chaîne de caractères' })
  ingredients?: string[];

  @IsOptional()
  @IsBoolean({ message: 'La disponibilité doit être un booléen' })
  available?: boolean;
}
