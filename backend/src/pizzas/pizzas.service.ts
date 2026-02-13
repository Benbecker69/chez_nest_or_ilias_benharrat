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

  /**
   * Recherche les pizzas par ingrédients
   * Les ingrédients sont normalisés (lowercase, trim) pour la recherche
   * Une pizza correspond si elle contient TOUS les ingrédients recherchés
   *
   * @param searchIngredients - Liste des ingrédients à rechercher
   * @returns Pizzas contenant tous les ingrédients
   */
  findByIngredients(searchIngredients: string[]): Pizza[] {
    // Normaliser les ingrédients de recherche (lowercase, trim)
    const normalizedSearch = searchIngredients.map((ingredient) =>
      ingredient.toLowerCase().trim(),
    );

    // Filtrer les pizzas qui contiennent TOUS les ingrédients recherchés
    return this.pizzas.filter((pizza) => {
      // Normaliser les ingrédients de la pizza
      const normalizedPizzaIngredients = pizza.ingredients.map((ingredient) =>
        ingredient.toLowerCase().trim(),
      );

      // Vérifier que tous les ingrédients recherchés sont dans la pizza
      return normalizedSearch.every((searchIngredient) =>
        normalizedPizzaIngredients.some((pizzaIngredient) =>
          pizzaIngredient.includes(searchIngredient),
        ),
      );
    });
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
