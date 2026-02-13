import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import type { Pizza } from './pizza.interface';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';

@Controller('pizzas')
export class PizzasController {
  constructor(private readonly pizzasService: PizzasService) {}

  @Get()
  findAll(
    @Query('ingredient') ingredient?: string,
    @Query('ingredients') ingredients?: string,
  ): Pizza[] {
    // Si on a des paramètres de recherche
    if (ingredient || ingredients) {
      // Construire la liste des ingrédients à rechercher
      let searchIngredients: string[] = [];

      if (ingredient) {
        searchIngredients.push(ingredient);
      }

      if (ingredients) {
        // Séparer par virgule et ajouter à la liste
        const ingredientsList = ingredients.split(',');
        searchIngredients.push(...ingredientsList);
      }

      return this.pizzasService.findByIngredients(searchIngredients);
    }

    // Sinon retourner toutes les pizzas
    return this.pizzasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Pizza {
    return this.pizzasService.findOne(+id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPizzaDto: CreatePizzaDto): Pizza {
    return this.pizzasService.create(createPizzaDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePizzaDto: UpdatePizzaDto,
  ): Pizza {
    return this.pizzasService.update(+id, updatePizzaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    this.pizzasService.remove(+id);
  }
}
