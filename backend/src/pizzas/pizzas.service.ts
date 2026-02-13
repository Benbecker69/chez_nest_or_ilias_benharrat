import { Injectable, NotFoundException } from '@nestjs/common';
import { Pizza } from './pizza.interface';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';

@Injectable()
export class PizzasService {
  private pizzas: Pizza[] = [
    {
      id: 1,
      name: 'Margherita',
      price: 10.5,
      ingredients: ['tomate', 'mozzarella', 'basilic'],
      available: true,
    },
    {
      id: 2,
      name: 'Regina',
      price: 12.0,
      ingredients: ['tomate', 'mozzarella', 'jambon', 'champignons'],
      available: true,
    },
    {
      id: 3,
      name: 'Quatre fromages',
      price: 13.5,
      ingredients: ['mozzarella', 'gorgonzola', 'parmesan', 'chèvre'],
      available: true,
    },
    {
      id: 4,
      name: 'Calzone',
      price: 14.0,
      ingredients: ['tomate', 'mozzarella', 'jambon', 'champignons', 'œuf'],
      available: false,
    },
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
      price: createPizzaDto.price,
      ingredients: createPizzaDto.ingredients,
      available: createPizzaDto.available,
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
      ...(updatePizzaDto.price !== undefined && { price: updatePizzaDto.price }),
      ...(updatePizzaDto.ingredients && { ingredients: updatePizzaDto.ingredients }),
      ...(updatePizzaDto.available !== undefined && { available: updatePizzaDto.available }),
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
