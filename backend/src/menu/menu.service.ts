import { Injectable } from '@nestjs/common';

export interface MenuDiscountResult {
  discountApplied: boolean;
  discountAmount: number;
  discountPercentage: number;
  eligibleAmount: number;
  alcoholicDrinksAmount: number;
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
   * Alors réduction de 10% sur TOUS les produits SAUF les boissons AVEC alcool
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
        eligibleAmount: 0,
        alcoholicDrinksAmount: 0,
      };
    }

    // Calculer la somme de TOUS les produits éligibles
    // Éligibles = TOUTES les pizzas + TOUTES les boissons sans alcool + TOUS les desserts
    const totalPizzas = pizzaPrices.reduce((sum, price) => sum + price, 0);
    const totalNonAlcoholicDrinks = nonAlcoholicDrinks.reduce(
      (sum, drink) => sum + drink.price,
      0,
    );
    const totalDesserts = dessertPrices.reduce((sum, price) => sum + price, 0);

    const eligibleAmount = totalPizzas + totalNonAlcoholicDrinks + totalDesserts;

    // Calculer la somme des boissons avec alcool (NON éligibles)
    const alcoholicDrinks = drinkPrices.filter((drink) => drink.withAlcohol);
    const alcoholicDrinksAmount = alcoholicDrinks.reduce(
      (sum, drink) => sum + drink.price,
      0,
    );

    // Appliquer 10% de réduction sur le montant éligible
    const discountAmount = eligibleAmount * 0.1;

    return {
      discountApplied: true,
      discountAmount: Number(discountAmount.toFixed(2)),
      discountPercentage: 10,
      eligibleAmount: Number(eligibleAmount.toFixed(2)),
      alcoholicDrinksAmount: Number(alcoholicDrinksAmount.toFixed(2)),
    };
  }
}
