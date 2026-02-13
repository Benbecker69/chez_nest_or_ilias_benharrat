'use client';

import { useEffect, useState } from 'react';
import { Pizza, Wine, IceCream, Loader2 } from 'lucide-react';
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
import Header from '@/components/Header';
import Section from '@/components/Section';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import OrderList from '@/components/OrderList';
import SectionSkeleton from '@/components/skeletons/SectionSkeleton';
import CartSkeleton from '@/components/skeletons/CartSkeleton';
import OrderListSkeleton from '@/components/skeletons/OrderListSkeleton';

export default function Home() {
  const [pizzas, setPizzas] = useState<PizzaType[]>([]);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [desserts, setDesserts] = useState<Dessert[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  // Recherche globale
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filtrer les produits en fonction de la recherche
  const filteredPizzas = pizzas.filter((pizza) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      pizza.name.toLowerCase().includes(query) ||
      pizza.ingredients.some((ing) => ing.toLowerCase().includes(query))
    );
  });

  const filteredDrinks = drinks.filter((drink) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return drink.name.toLowerCase().includes(query);
  });

  const filteredDesserts = desserts.filter((dessert) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return dessert.name.toLowerCase().includes(query);
  });

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
      setSelectedPizzas([]);
      setSelectedDrinks([]);
      setSelectedDesserts([]);
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

  const hasMenuDiscount =
    selectedPizzas.length > 0 &&
    selectedDrinks.some((id) => {
      const drink = drinks.find((d) => d.id === id);
      return drink && !drink.withAlcohol;
    }) &&
    selectedDesserts.length > 0;

  const cartPizzas = selectedPizzas
    .map((id) => pizzas.find((p) => p.id === id))
    .filter((p): p is PizzaType => p !== undefined);

  const cartDrinks = selectedDrinks
    .map((id) => drinks.find((d) => d.id === id))
    .filter((d): d is Drink => d !== undefined);

  const cartDesserts = selectedDesserts
    .map((id) => desserts.find((d) => d.id === id))
    .filter((d): d is Dessert => d !== undefined);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header searchQuery="" onSearchChange={() => {}} />

        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne gauche - Menu skeletons */}
            <div className="lg:col-span-2 space-y-12">
              <SectionSkeleton itemCount={3} />
              <SectionSkeleton itemCount={5} />
              <SectionSkeleton itemCount={4} />
            </div>

            {/* Colonne droite - Panier & Commandes skeletons */}
            <div className="space-y-6">
              <CartSkeleton />
              <OrderListSkeleton />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne gauche - Menu */}
          <div className="lg:col-span-2 space-y-12">
            {/* Pizzas */}
            <Section
              title="Nos Pizzas"
              icon={<Pizza className="w-6 h-6" />}
            >
              {filteredPizzas.filter((p) => p.available).length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                  <Pizza className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">
                    Aucun résultat dans la catégorie "Pizzas"
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    Essayez avec d'autres mots-clés
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredPizzas
                    .filter((p) => p.available)
                    .map((pizza) => {
                    // Détecter le format d'image disponible
                    const imageExt = pizza.id === 1 ? 'webp' : 'jpg';
                    return (
                      <ProductCard
                        key={pizza.id}
                        id={pizza.id}
                        name={pizza.name}
                        price={pizza.price}
                        imagePath={`/images/products/pizza-${pizza.id}.${imageExt}`}
                        ingredients={pizza.ingredients}
                        isSelected={selectedPizzas.includes(pizza.id)}
                        onToggle={() =>
                          toggleSelection(
                            pizza.id,
                            selectedPizzas,
                            setSelectedPizzas
                          )
                        }
                      />
                    );
                  })}
                </div>
              )}
            </Section>

            {/* Boissons */}
            <Section
              title="Nos Boissons"
              icon={<Wine className="w-6 h-6" />}
            >
              {filteredDrinks.filter((d) => d.available).length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                  <Wine className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">
                    Aucun résultat dans la catégorie "Boissons"
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    Essayez avec d'autres mots-clés
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDrinks
                  .filter((d) => d.available)
                  .map((drink) => {
                    // Format selon l'ID: 1=webp, 2=jpg, 3=jpg, 4=webp, 5=jpg
                    const imageExt = [1, 4].includes(drink.id) ? 'webp' : 'jpg';
                    return (
                      <ProductCard
                        key={drink.id}
                        id={drink.id}
                        name={drink.name}
                        price={drink.price}
                        imagePath={`/images/products/drink-${drink.id}.${imageExt}`}
                        description={drink.size}
                        badge={drink.withAlcohol ? 'Alcool' : undefined}
                        isSelected={selectedDrinks.includes(drink.id)}
                        imageStyle="contain"
                        onToggle={() =>
                          toggleSelection(
                            drink.id,
                            selectedDrinks,
                            setSelectedDrinks
                          )
                        }
                      />
                    );
                  })}
                </div>
              )}
            </Section>

            {/* Desserts */}
            <Section
              title="Nos Desserts"
              icon={<IceCream className="w-6 h-6" />}
            >
              {filteredDesserts.filter((d) => d.available).length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                  <IceCream className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">
                    Aucun résultat dans la catégorie "Desserts"
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    Essayez avec d'autres mots-clés
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDesserts
                  .filter((d) => d.available)
                  .map((dessert) => {
                    // Format selon l'ID: 2=webp, les autres=jpg
                    const imageExt = dessert.id === 2 ? 'webp' : 'jpg';
                    return (
                      <ProductCard
                        key={dessert.id}
                        id={dessert.id}
                        name={dessert.name}
                        price={dessert.price}
                        imagePath={`/images/products/dessert-${dessert.id}.${imageExt}`}
                        isSelected={selectedDesserts.includes(dessert.id)}
                        onToggle={() =>
                          toggleSelection(
                            dessert.id,
                            selectedDesserts,
                            setSelectedDesserts
                          )
                        }
                      />
                    );
                  })}
                </div>
              )}
            </Section>
          </div>

          {/* Colonne droite - Panier & Commandes */}
          <div className="space-y-6">
            <Cart
              pizzas={cartPizzas}
              drinks={cartDrinks}
              desserts={cartDesserts}
              hasMenuDiscount={hasMenuDiscount}
              isCreating={creating}
              onCreateOrder={handleCreateOrder}
            />

            <OrderList orders={orders} onMarkProcessed={handleMarkProcessed} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg font-semibold text-slate-900 mb-1">Chez Nest-Or</p>
          <p className="text-slate-500 text-sm">
            Pizzeria italienne depuis 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
