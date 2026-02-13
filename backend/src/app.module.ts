import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PizzasModule } from './pizzas/pizzas.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [PizzasModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
