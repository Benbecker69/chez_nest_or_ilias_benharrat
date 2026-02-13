'use client';

import { useEffect, useState } from 'react';
import { Pizza, ShoppingCart, Check, Loader2 } from 'lucide-react';
import {
  getPizzas,
  getDrinks,
  getDesserts,
  getOrders,
  createOrder,
  markOrderAsProcessed,
  type Pizza as PizzaType,
  type Drink,
  type Dessert,
  type Order,
} from '@/lib/api';

export default function Home() {
  const [pizzas, setPizzas] = useState<PizzaType[]>([]);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [desserts, setDesserts] = useState<Dessert[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  // Panier
  const [selectedPizzas, setSelectedPizzas] = useState<number[]>([]);
  const [selectedDrinks, setSelectedDrinks] = useState<number[]>([]);
  const [selectedDesserts, setSelectedDesserts] = useState<number[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [p, dr, de, o] = await Promise.all([
        getPizzas(),
        getDrinks(),
        getDesserts(),
        getOrders(),
      ]);
      setPizzas(p);
      setDrinks(dr);
      setDesserts(de);
      setOrders(o);
    } catch (error) {
      console.error('Erreur chargement:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateOrder() {
    if (selectedPizzas.length === 0) {
      alert('Sélectionnez au moins une pizza');
      return;
    }

    setCreating(true);
    try {
      await createOrder({
        pizzas: selectedPizzas,
        drinks: selectedDrinks.length > 0 ? selectedDrinks : undefined,
        desserts: selectedDesserts.length > 0 ? selectedDesserts : undefined,
      });
      // Reset panier
      setSelectedPizzas([]);
      setSelectedDrinks([]);
      setSelectedDesserts([]);
      // Recharger les commandes
      const o = await getOrders();
      setOrders(o);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erreur inconnue';
      alert(`Erreur: ${message}`);
    } finally {
      setCreating(false);
    }
  }

  async function handleMarkProcessed(id: number) {
    try {
      await markOrderAsProcessed(id);
      const o = await getOrders();
      setOrders(o);
    } catch (error) {
      alert('Erreur lors du traitement de la commande');
    }
  }

  function toggleSelection(
    id: number,
    selected: number[],
    setSelected: (ids: number[]) => void
  ) {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else {
      setSelected([...selected, id]);
    }
  }

  // Calculer si menu promo s'applique sur le panier
  const hasMenuDiscount =
    selectedPizzas.length > 0 &&
    selectedDrinks.some((id) => {
      const drink = drinks.find((d) => d.id === id);
      return drink && !drink.withAlcohol;
    }) &&
    selectedDesserts.length > 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Pizza className="w-8 h-8 text-gray-700" />
            <h1 className="text-2xl font-semibold text-gray-900">
              Chez Nest-Or
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne gauche - Menu */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pizzas */}
            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Pizzas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pizzas
                  .filter((p) => p.available)
                  .map((pizza) => (
                    <button
                      key={pizza.id}
                      onClick={() =>
                        toggleSelection(
                          pizza.id,
                          selectedPizzas,
                          setSelectedPizzas
                        )
                      }
                      className={`text-left p-4 rounded-lg border-2 transition ${
                        selectedPizzas.includes(pizza.id)
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {pizza.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {pizza.ingredients.join(', ')}
                          </p>
                        </div>
                        <span className="text-gray-900 font-medium">
                          {pizza.price.toFixed(2)}€
                        </span>
                      </div>
                    </button>
                  ))}
              </div>
            </section>

            {/* Boissons */}
            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Boissons
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {drinks
                  .filter((d) => d.available)
                  .map((drink) => (
                    <button
                      key={drink.id}
                      onClick={() =>
                        toggleSelection(
                          drink.id,
                          selectedDrinks,
                          setSelectedDrinks
                        )
                      }
                      className={`text-left p-4 rounded-lg border-2 transition ${
                        selectedDrinks.includes(drink.id)
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {drink.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {drink.size}
                            {drink.withAlcohol && ' • Alcool'}
                          </p>
                        </div>
                        <span className="text-gray-900 font-medium">
                          {drink.price.toFixed(2)}€
                        </span>
                      </div>
                    </button>
                  ))}
              </div>
            </section>

            {/* Desserts */}
            <section>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Desserts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {desserts
                  .filter((d) => d.available)
                  .map((dessert) => (
                    <button
                      key={dessert.id}
                      onClick={() =>
                        toggleSelection(
                          dessert.id,
                          selectedDesserts,
                          setSelectedDesserts
                        )
                      }
                      className={`text-left p-4 rounded-lg border-2 transition ${
                        selectedDesserts.includes(dessert.id)
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-900">
                          {dessert.name}
                        </h3>
                        <span className="text-gray-900 font-medium">
                          {dessert.price.toFixed(2)}€
                        </span>
                      </div>
                    </button>
                  ))}
              </div>
            </section>
          </div>

          {/* Colonne droite - Panier & Commandes */}
          <div className="space-y-8">
            {/* Panier */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-4">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                <h2 className="text-lg font-medium text-gray-900">
                  Votre commande
                </h2>
              </div>

              {selectedPizzas.length === 0 &&
              selectedDrinks.length === 0 &&
              selectedDesserts.length === 0 ? (
                <p className="text-sm text-gray-500">Panier vide</p>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2 text-sm">
                    {selectedPizzas.map((id) => {
                      const pizza = pizzas.find((p) => p.id === id);
                      return (
                        <div
                          key={id}
                          className="flex justify-between text-gray-700"
                        >
                          <span>{pizza?.name}</span>
                          <span>{pizza?.price.toFixed(2)}€</span>
                        </div>
                      );
                    })}
                    {selectedDrinks.map((id) => {
                      const drink = drinks.find((d) => d.id === id);
                      return (
                        <div
                          key={id}
                          className="flex justify-between text-gray-700"
                        >
                          <span>{drink?.name}</span>
                          <span>{drink?.price.toFixed(2)}€</span>
                        </div>
                      );
                    })}
                    {selectedDesserts.map((id) => {
                      const dessert = desserts.find((d) => d.id === id);
                      return (
                        <div
                          key={id}
                          className="flex justify-between text-gray-700"
                        >
                          <span>{dessert?.name}</span>
                          <span>{dessert?.price.toFixed(2)}€</span>
                        </div>
                      );
                    })}
                  </div>

                  {hasMenuDiscount && (
                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-sm text-green-700 font-medium">
                        <Check className="w-4 h-4" />
                        <span>Réduction menu -10%</span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleCreateOrder}
                    disabled={creating}
                    className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {creating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Commande en cours...</span>
                      </>
                    ) : (
                      <span>Commander</span>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Commandes */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Commandes récentes
              </h2>
              <div className="space-y-3">
                {orders.slice(-5).reverse().map((order) => (
                  <div
                    key={order.id}
                    className="p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        Commande #{order.id}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {order.totalPrice.toFixed(2)}€
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      {order.pizzas.length} pizza(s), {order.drinks.length}{' '}
                      boisson(s), {order.desserts.length} dessert(s)
                    </div>
                    {!order.processed ? (
                      <button
                        onClick={() => handleMarkProcessed(order.id)}
                        className="text-xs text-gray-700 hover:text-gray-900 underline"
                      >
                        Marquer comme traitée
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 text-xs text-green-700">
                        <Check className="w-3 h-3" />
                        <span>Traitée</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
