import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Order } from './order.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PizzasService } from '../pizzas/pizzas.service';
import { DrinksService } from '../drinks/drinks.service';
import { DessertsService } from '../desserts/desserts.service';
import { MenuService } from '../menu/menu.service';

@Injectable()
export class OrdersService {
  private orders: Map<number, Order> = new Map([
    [
      1,
      {
        id: 1,
        pizzas: [1, 2],
        drinks: [1],
        desserts: [1],
        totalPrice: 18.5,
        processed: false,
        createdAt: new Date('2026-02-13T09:00:00'),
      },
    ],
    [
      2,
      {
        id: 2,
        pizzas: [3],
        drinks: [3],
        desserts: [],
        totalPrice: 17.5,
        processed: true,
        createdAt: new Date('2026-02-13T10:30:00'),
      },
    ],
  ]);
  private nextId = 3;

  constructor(
    private readonly pizzasService: PizzasService,
    private readonly drinksService: DrinksService,
    private readonly dessertsService: DessertsService,
    private readonly menuService: MenuService,
  ) {}

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

  /**
   * Crée une nouvelle commande avec calcul automatique du totalPrice
   * Vérifie l'existence et la disponibilité de toutes les ressources
   */
  create(createOrderDto: CreateOrderDto): Order {
    const { pizzas, drinks = [], desserts = [] } = createOrderDto;

    // Calculer le totalPrice et valider les ressources
    const totalPrice = this.validateAndCalculateTotalPrice(
      pizzas,
      drinks,
      desserts,
    );

    const newOrder: Order = {
      id: this.nextId++,
      pizzas,
      drinks,
      desserts,
      totalPrice,
      processed: false,
      createdAt: new Date(),
    };

    this.orders.set(newOrder.id, newOrder);
    return newOrder;
  }

  /**
   * Met à jour une commande avec recalcul automatique du totalPrice
   * Vérifie l'existence et la disponibilité de toutes les ressources
   */
  update(id: number, updateOrderDto: UpdateOrderDto): Order {
    const existingOrder = this.findOne(id);

    // Déterminer les nouvelles valeurs (utiliser les nouvelles si fournies, sinon garder les anciennes)
    const pizzas = updateOrderDto.pizzas ?? existingOrder.pizzas;
    const drinks = updateOrderDto.drinks ?? existingOrder.drinks;
    const desserts = updateOrderDto.desserts ?? existingOrder.desserts;
    const processed = updateOrderDto.processed ?? existingOrder.processed;

    // Recalculer le totalPrice
    const totalPrice = this.validateAndCalculateTotalPrice(
      pizzas,
      drinks,
      desserts,
    );

    const updatedOrder: Order = {
      ...existingOrder,
      pizzas,
      drinks,
      desserts,
      totalPrice,
      processed,
    };

    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  /**
   * Supprime une commande
   */
  remove(id: number): void {
    const order = this.findOne(id);
    this.orders.delete(order.id);
  }

  /**
   * Marque une commande comme traitée (ne modifie QUE le champ processed)
   */
  markAsProcessed(id: number): Order {
    const order = this.findOne(id);
    order.processed = true;
    this.orders.set(id, order);
    return order;
  }

  /**
   * Valide que toutes les ressources existent et sont disponibles
   * Calcule le totalPrice avec application de la réduction menu si applicable
   *
   * @throws NotFoundException si une ressource n'existe pas
   * @throws BadRequestException si une ressource n'est pas disponible
   */
  private validateAndCalculateTotalPrice(
    pizzaIds: number[],
    drinkIds: number[],
    dessertIds: number[],
  ): number {
    // 1. Vérifier existence et disponibilité des pizzas
    const pizzaPrices: number[] = [];
    for (const pizzaId of pizzaIds) {
      const pizza = this.pizzasService.findOne(pizzaId); // Lève NotFoundException si inexistant
      if (!pizza.available) {
        throw new BadRequestException(
          `Pizza "${pizza.name}" (ID ${pizzaId}) is not available`,
        );
      }
      pizzaPrices.push(pizza.price);
    }

    // 2. Vérifier existence et disponibilité des boissons
    const drinkPrices: { price: number; withAlcohol: boolean }[] = [];
    for (const drinkId of drinkIds) {
      const drink = this.drinksService.findOne(drinkId); // Lève NotFoundException si inexistant
      if (!drink.available) {
        throw new BadRequestException(
          `Drink "${drink.name}" (ID ${drinkId}) is not available`,
        );
      }
      drinkPrices.push({ price: drink.price, withAlcohol: drink.withAlcohol });
    }

    // 3. Vérifier existence et disponibilité des desserts
    const dessertPrices: number[] = [];
    for (const dessertId of dessertIds) {
      const dessert = this.dessertsService.findOne(dessertId); // Lève NotFoundException si inexistant
      if (!dessert.available) {
        throw new BadRequestException(
          `Dessert "${dessert.name}" (ID ${dessertId}) is not available`,
        );
      }
      dessertPrices.push(dessert.price);
    }

    // 4. Calculer le total brut (somme de tous les prix)
    const subtotal =
      pizzaPrices.reduce((sum, price) => sum + price, 0) +
      drinkPrices.reduce((sum, item) => sum + item.price, 0) +
      dessertPrices.reduce((sum, price) => sum + price, 0);

    // 5. Appliquer la réduction menu si applicable
    const menuDiscount = this.menuService.computeDiscount(
      pizzaPrices,
      drinkPrices,
      dessertPrices,
    );

    const totalPrice = subtotal - menuDiscount.discountAmount;

    // Arrondir à 2 décimales
    return Number(totalPrice.toFixed(2));
  }
}
