import { Module } from '@nestjs/common';
import { PizzasController } from './pizzas.controller';
import { PizzasService } from './pizzas.service';

@Module({
  controllers: [PizzasController],
  providers: [PizzasService],
  exports: [PizzasService],
})
export class PizzasModule {}
