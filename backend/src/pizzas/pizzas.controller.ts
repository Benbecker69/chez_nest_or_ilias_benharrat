import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
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
  findAll(): Pizza[] {
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
