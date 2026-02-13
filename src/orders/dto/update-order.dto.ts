import {
  IsArray,
  IsNumber,
  IsPositive,
  IsBoolean,
  IsOptional,
  ArrayMinSize,
  Min,
} from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsArray({ message: 'pizzas doit être un tableau' })
  @ArrayMinSize(1, { message: 'La commande doit contenir au moins une pizza' })
  @IsNumber({}, { each: true, message: 'Chaque ID de pizza doit être un nombre' })
  @IsPositive({ each: true, message: 'Les IDs de pizza doivent être positifs' })
  pizzas?: number[];

  @IsOptional()
  @IsNumber({}, { message: 'Le prix total doit être un nombre' })
  @Min(0, { message: 'Le prix total doit être positif ou zéro' })
  totalPrice?: number;

  @IsOptional()
  @IsBoolean({ message: 'processed doit être un booléen' })
  processed?: boolean;
}
