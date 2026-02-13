import { Injectable, NotFoundException } from '@nestjs/common';
import { Dessert } from './dessert.interface';
import { CreateDessertDto } from './dto/create-dessert.dto';
import { UpdateDessertDto } from './dto/update-dessert.dto';

@Injectable()
export class DessertsService {
  private desserts: Dessert[] = [
    {
      id: 1,
      name: 'Tiramisu',
      price: 5.5,
      available: true,
    },
    {
      id: 2,
      name: 'Panna cotta',
      price: 5.0,
      available: true,
    },
    {
      id: 3,
      name: 'Fondant au chocolat',
      price: 6.0,
      available: true,
    },
    {
      id: 4,
      name: 'Tarte citron meringuée',
      price: 5.5,
      available: true,
    },
    {
      id: 5,
      name: 'Salade de fruits',
      price: 4.5,
      available: false,
    },
  ];
  private nextId = 6;

  findAll(): Dessert[] {
    return this.desserts;
  }

  findOne(id: number): Dessert {
    const dessert = this.desserts.find((dessert) => dessert.id === id);
    if (!dessert) {
      throw new NotFoundException(`Dessert with ID ${id} not found`);
    }
    return dessert;
  }

  create(createDessertDto: CreateDessertDto): Dessert {
    const newDessert: Dessert = {
      id: this.nextId++,
      name: createDessertDto.name,
      price: createDessertDto.price,
      available: createDessertDto.available,
    };
    this.desserts.push(newDessert);
    return newDessert;
  }

  update(id: number, updateDessertDto: UpdateDessertDto): Dessert {
    const dessertIndex = this.desserts.findIndex(
      (dessert) => dessert.id === id,
    );
    if (dessertIndex === -1) {
      throw new NotFoundException(`Dessert with ID ${id} not found`);
    }

    const updatedDessert: Dessert = {
      ...this.desserts[dessertIndex],
      ...(updateDessertDto.name && { name: updateDessertDto.name }),
      ...(updateDessertDto.price !== undefined && {
        price: updateDessertDto.price,
      }),
      ...(updateDessertDto.available !== undefined && {
        available: updateDessertDto.available,
      }),
    };

    this.desserts[dessertIndex] = updatedDessert;
    return updatedDessert;
  }

  remove(id: number): void {
    const dessertIndex = this.desserts.findIndex(
      (dessert) => dessert.id === id,
    );
    if (dessertIndex === -1) {
      throw new NotFoundException(`Dessert with ID ${id} not found`);
    }
    this.desserts.splice(dessertIndex, 1);
  }
}
