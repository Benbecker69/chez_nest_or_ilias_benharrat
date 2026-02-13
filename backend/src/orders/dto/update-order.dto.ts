import {
  IsArray,
  IsNumber,
  IsPositive,
  IsBoolean,
  IsOptional,
  ArrayMinSize,
} from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsArray({ message: 'pizzas doit être un tableau' })
  @ArrayMinSize(1, { message: 'La commande doit contenir au moins une pizza' })
  @IsNumber({}, { each: true, message: 'Chaque ID de pizza doit être un nombre' })
  @IsPositive({ each: true, message: 'Les IDs de pizza doivent être positifs' })
  pizzas?: number[];

  @IsOptional()
  @IsArray({ message: 'drinks doit être un tableau' })
  @IsNumber({}, { each: true, message: 'Chaque ID de boisson doit être un nombre' })
  @IsPositive({ each: true, message: 'Les IDs de boisson doivent être positifs' })
  drinks?: number[];

  @IsOptional()
  @IsArray({ message: 'desserts doit être un tableau' })
  @IsNumber({}, { each: true, message: 'Chaque ID de dessert doit être un nombre' })
  @IsPositive({ each: true, message: 'Les IDs de dessert doivent être positifs' })
  desserts?: number[];

  @IsOptional()
  @IsBoolean({ message: 'processed doit être un booléen' })
  processed?: boolean;

  // NOTE: totalPrice n'est PAS dans le DTO car il est calculé automatiquement côté serveur
}
