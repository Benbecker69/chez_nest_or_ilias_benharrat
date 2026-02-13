import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PizzasModule } from '../pizzas/pizzas.module';
import { DrinksModule } from '../drinks/drinks.module';
import { DessertsModule } from '../desserts/desserts.module';
import { MenuModule } from '../menu/menu.module';

@Module({
  imports: [PizzasModule, DrinksModule, DessertsModule, MenuModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
