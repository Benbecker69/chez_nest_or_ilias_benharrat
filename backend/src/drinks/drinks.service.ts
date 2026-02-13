import { Injectable, NotFoundException } from '@nestjs/common';
import { Drink } from './drink.interface';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';

@Injectable()
export class DrinksService {
  private drinks: Drink[] = [
    {
      id: 1,
      name: 'Coca-Cola',
      price: 2.5,
      size: '33cl',
      withAlcohol: false,
      available: true,
    },
    {
      id: 2,
      name: 'Orangina',
      price: 2.5,
      size: '33cl',
      withAlcohol: false,
      available: true,
    },
    {
      id: 3,
      name: 'Bière Heineken',
      price: 4.0,
      size: '50cl',
      withAlcohol: true,
      available: true,
    },
    {
      id: 4,
      name: 'Vin rouge',
      price: 5.5,
      size: '25cl',
      withAlcohol: true,
      available: true,
    },
    {
      id: 5,
      name: 'Eau pétillante',
      price: 2.0,
      size: '50cl',
      withAlcohol: false,
      available: true,
    },
    {
      id: 6,
      name: 'Jus d\'orange',
      price: 3.0,
      size: '25cl',
      withAlcohol: false,
      available: false,
    },
  ];
  private nextId = 7;

  findAll(): Drink[] {
    return this.drinks;
  }

  findOne(id: number): Drink {
    const drink = this.drinks.find((drink) => drink.id === id);
    if (!drink) {
      throw new NotFoundException(`Drink with ID ${id} not found`);
    }
    return drink;
  }

  create(createDrinkDto: CreateDrinkDto): Drink {
    const newDrink: Drink = {
      id: this.nextId++,
      name: createDrinkDto.name,
      price: createDrinkDto.price,
      size: createDrinkDto.size,
      withAlcohol: createDrinkDto.withAlcohol,
      available: createDrinkDto.available,
    };
    this.drinks.push(newDrink);
    return newDrink;
  }

  update(id: number, updateDrinkDto: UpdateDrinkDto): Drink {
    const drinkIndex = this.drinks.findIndex((drink) => drink.id === id);
    if (drinkIndex === -1) {
      throw new NotFoundException(`Drink with ID ${id} not found`);
    }

    const updatedDrink: Drink = {
      ...this.drinks[drinkIndex],
      ...(updateDrinkDto.name && { name: updateDrinkDto.name }),
      ...(updateDrinkDto.price !== undefined && { price: updateDrinkDto.price }),
      ...(updateDrinkDto.size && { size: updateDrinkDto.size }),
      ...(updateDrinkDto.withAlcohol !== undefined && {
        withAlcohol: updateDrinkDto.withAlcohol,
      }),
      ...(updateDrinkDto.available !== undefined && {
        available: updateDrinkDto.available,
      }),
    };

    this.drinks[drinkIndex] = updatedDrink;
    return updatedDrink;
  }

  remove(id: number): void {
    const drinkIndex = this.drinks.findIndex((drink) => drink.id === id);
    if (drinkIndex === -1) {
      throw new NotFoundException(`Drink with ID ${id} not found`);
    }
    this.drinks.splice(drinkIndex, 1);
  }
}
