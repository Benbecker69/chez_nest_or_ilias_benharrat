import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PizzasModule } from './pizzas/pizzas.module';
import { DrinksModule } from './drinks/drinks.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [PizzasModule, DrinksModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
