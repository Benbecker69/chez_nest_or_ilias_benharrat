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
import { DrinksService } from './drinks.service';
import type { Drink } from './drink.interface';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';

@Controller('drinks')
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) {}

  @Get()
  findAll(): Drink[] {
    return this.drinksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Drink {
    return this.drinksService.findOne(+id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDrinkDto: CreateDrinkDto): Drink {
    return this.drinksService.create(createDrinkDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDrinkDto: UpdateDrinkDto,
  ): Drink {
    return this.drinksService.update(+id, updateDrinkDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    this.drinksService.remove(+id);
  }
}
