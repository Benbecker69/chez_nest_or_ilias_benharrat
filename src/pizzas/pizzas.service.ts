import { Injectable, NotFoundException } from '@nestjs/common';
import { Pizza } from './pizza.interface';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';

@Injectable()
export class PizzasService {
  private pizzas: Pizza[] = [
    { id: 1, name: 'Boisées' },
    { id: 2, name: 'Oriantale' },
    { id: 3, name: 'Quatre fromages' },
    { id: 4, name: 'Kebab' },
  ];
  private nextId = 5;

  findAll(): Pizza[] {
    return this.pizzas;
  }

  findOne(id: number): Pizza {
    const pizza = this.pizzas.find((pizza) => pizza.id === id);
    if (!pizza) {
      throw new NotFoundException(`Pizza with ID ${id} not found`);
    }
    return pizza;
  }

  create(createPizzaDto: CreatePizzaDto): Pizza {
    const newPizza: Pizza = {
      id: this.nextId++,
      name: createPizzaDto.name,
    };
    this.pizzas.push(newPizza);
    return newPizza;
  }

  update(id: number, updatePizzaDto: UpdatePizzaDto): Pizza {
    const pizzaIndex = this.pizzas.findIndex((pizza) => pizza.id === id);
    if (pizzaIndex === -1) {
      throw new NotFoundException(`Pizza with ID ${id} not found`);
    }

    const updatedPizza: Pizza = {
      ...this.pizzas[pizzaIndex],
      ...(updatePizzaDto.name && { name: updatePizzaDto.name }),
    };

    this.pizzas[pizzaIndex] = updatedPizza;
    return updatedPizza;
  }

  remove(id: number): void {
    const pizzaIndex = this.pizzas.findIndex((pizza) => pizza.id === id);
    if (pizzaIndex === -1) {
      throw new NotFoundException(`Pizza with ID ${id} not found`);
    }
    this.pizzas.splice(pizzaIndex, 1);
  }
}
