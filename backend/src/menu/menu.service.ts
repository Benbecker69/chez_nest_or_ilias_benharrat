import { Injectable } from '@nestjs/common';

export interface MenuDiscountResult {
  discountApplied: boolean;
  discountAmount: number;
  discountPercentage: number;
  itemsInMenu: {
    pizzaPrice: number;
    drinkPrice: number;
    dessertPrice: number;
  } | null;
}

@Injectable()
export class MenuService {
  /**
   * Calcule la réduction "menu" pour une commande
   *
   * Règle : Si la commande contient AU MOINS :
   * - 1 pizza
   * - 1 boisson SANS alcool
   * - 1 dessert
   * Alors réduction de 10% sur la somme de ces 3 éléments
   *
   * @param pizzaPrices - Prix de toutes les pizzas de la commande
   * @param drinkPrices - Prix de toutes les boissons (avec info alcool)
   * @param dessertPrices - Prix de tous les desserts de la commande
   * @returns Résultat du calcul de réduction
   */
  computeDiscount(
    pizzaPrices: number[],
    drinkPrices: { price: number; withAlcohol: boolean }[],
    dessertPrices: number[],
  ): MenuDiscountResult {
    // Vérifier qu'on a au moins 1 de chaque élément requis
    const hasPizza = pizzaPrices.length > 0;
    const hasDessert = dessertPrices.length > 0;

    // Filtrer pour ne garder que les boissons SANS alcool
    const nonAlcoholicDrinks = drinkPrices.filter(
      (drink) => !drink.withAlcohol,
    );
    const hasNonAlcoholicDrink = nonAlcoholicDrinks.length > 0;

    // Si on n'a pas les 3 éléments requis, pas de réduction
    if (!hasPizza || !hasNonAlcoholicDrink || !hasDessert) {
      return {
        discountApplied: false,
        discountAmount: 0,
        discountPercentage: 0,
        itemsInMenu: null,
      };
    }

    // Prendre le premier de chaque (le moins cher pour optimiser le client)
    // En réalité, on pourrait optimiser en prenant les moins chers, mais
    // pour simplifier, on prend le premier de chaque
    const pizzaPrice = pizzaPrices[0];
    const drinkPrice = nonAlcoholicDrinks[0].price;
    const dessertPrice = dessertPrices[0];

    // Calculer la somme des 3 éléments
    const menuTotal = pizzaPrice + drinkPrice + dessertPrice;

    // Appliquer 10% de réduction
    const discountAmount = menuTotal * 0.1;

    return {
      discountApplied: true,
      discountAmount: Number(discountAmount.toFixed(2)),
      discountPercentage: 10,
      itemsInMenu: {
        pizzaPrice,
        drinkPrice,
        dessertPrice,
      },
    };
  }
}
