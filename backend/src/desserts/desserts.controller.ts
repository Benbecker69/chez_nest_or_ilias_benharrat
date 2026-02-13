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
import { DessertsService } from './desserts.service';
import type { Dessert } from './dessert.interface';
import { CreateDessertDto } from './dto/create-dessert.dto';
import { UpdateDessertDto } from './dto/update-dessert.dto';

@Controller('desserts')
export class DessertsController {
  constructor(private readonly dessertsService: DessertsService) {}

  @Get()
  findAll(): Dessert[] {
    return this.dessertsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Dessert {
    return this.dessertsService.findOne(+id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDessertDto: CreateDessertDto): Dessert {
    return this.dessertsService.create(createDessertDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDessertDto: UpdateDessertDto,
  ): Dessert {
    return this.dessertsService.update(+id, updateDessertDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    this.dessertsService.remove(+id);
  }
}
