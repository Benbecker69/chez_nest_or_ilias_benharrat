import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdatePizzaDto {
  @IsOptional()
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @MinLength(3, { message: 'Le nom doit contenir au moins 3 caractères' })
  name?: string;
}
