import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './order.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  private orders: Map<number, Order> = new Map([
    [
      1,
      {
        id: 1,
        pizzas: [1, 2],
        totalPrice: 25.5,
        processed: false,
        createdAt: new Date('2026-02-12T09:00:00'),
      },
    ],
    [
      2,
      {
        id: 2,
        pizzas: [3],
        totalPrice: 12.0,
        processed: true,
        createdAt: new Date('2026-02-12T10:30:00'),
      },
    ],
  ]);
  private nextId = 3;

  findAll(): Order[] {
    return Array.from(this.orders.values());
  }

  findOne(id: number): Order {
    const order = this.orders.get(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  create(createOrderDto: CreateOrderDto): Order {
    const newOrder: Order = {
      id: this.nextId++,
      pizzas: createOrderDto.pizzas,
      totalPrice: createOrderDto.totalPrice,
      processed: false,
      createdAt: new Date(), // Rempli automatiquement
    };
    this.orders.set(newOrder.id, newOrder);
    return newOrder;
  }

  update(id: number, updateOrderDto: UpdateOrderDto): Order {
    const order = this.findOne(id); // Vérifie que la commande existe

    const updatedOrder: Order = {
      ...order,
      ...(updateOrderDto.pizzas && { pizzas: updateOrderDto.pizzas }),
      ...(updateOrderDto.totalPrice !== undefined && {
        totalPrice: updateOrderDto.totalPrice,
      }),
      ...(updateOrderDto.processed !== undefined && {
        processed: updateOrderDto.processed,
      }),
    };

    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  remove(id: number): void {
    const order = this.findOne(id); // Vérifie que la commande existe
    this.orders.delete(order.id);
  }

  markAsProcessed(id: number): Order {
    const order = this.findOne(id);
    order.processed = true;
    this.orders.set(id, order);
    return order;
  }
}
