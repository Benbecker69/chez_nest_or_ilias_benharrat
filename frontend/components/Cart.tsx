'use client';

import { ShoppingCart, Percent } from 'lucide-react';
import Button from './ui/Button';

interface CartItem {
  id: number;
  name: string;
  price: number;
}

interface CartProps {
  pizzas: CartItem[];
  drinks: CartItem[];
  desserts: CartItem[];
  hasMenuDiscount: boolean;
  isCreating: boolean;
  onCreateOrder: () => void;
}

export default function Cart({
  pizzas,
  drinks,
  desserts,
  hasMenuDiscount,
  isCreating,
  onCreateOrder,
}: CartProps) {
  const isEmpty = pizzas.length === 0 && drinks.length === 0 && desserts.length === 0;

  const subtotal = [
    ...pizzas.map((p) => p.price),
    ...drinks.map((d) => d.price),
    ...desserts.map((d) => d.price),
  ].reduce((sum, price) => sum + price, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="bg-slate-900 p-6">
        <div className="flex items-center gap-3 text-white">
          <ShoppingCart className="w-6 h-6" />
          <div>
            <h2 className="text-xl font-semibold">Votre commande</h2>
            <p className="text-slate-300 text-sm">
              {pizzas.length + drinks.length + desserts.length} article(s)
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {isEmpty ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">Votre panier est vide</p>
            <p className="text-sm text-slate-400 mt-1">
              Sélectionnez des produits
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Items list */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {pizzas.map((item) => (
                <div
                  key={`pizza-${item.id}`}
                  className="flex justify-between items-center animate-slide-in"
                >
                  <span className="text-slate-700">{item.name}</span>
                  <span className="text-slate-900 font-semibold">
                    {item.price.toFixed(2)}€
                  </span>
                </div>
              ))}
              {drinks.map((item) => (
                <div
                  key={`drink-${item.id}`}
                  className="flex justify-between items-center animate-slide-in"
                >
                  <span className="text-slate-700">{item.name}</span>
                  <span className="text-slate-900 font-semibold">
                    {item.price.toFixed(2)}€
                  </span>
                </div>
              ))}
              {desserts.map((item) => (
                <div
                  key={`dessert-${item.id}`}
                  className="flex justify-between items-center animate-slide-in"
                >
                  <span className="text-slate-700">{item.name}</span>
                  <span className="text-slate-900 font-semibold">
                    {item.price.toFixed(2)}€
                  </span>
                </div>
              ))}
            </div>

            {/* Menu discount badge - EN VERT */}
            {hasMenuDiscount && (
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 animate-pulse-subtle">
                <div className="flex items-center gap-3 text-green-700">
                  <div className="bg-green-500 text-white p-2 rounded-lg">
                    <Percent className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Réduction menu -10%</p>
                    <p className="text-xs text-green-600">
                      Pizza + Boisson + Dessert
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Total */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-slate-900">
                  {subtotal.toFixed(2)}€
                </span>
              </div>

              <Button
                onClick={onCreateOrder}
                isLoading={isCreating}
                variant="primary"
                size="lg"
                className="w-full hover-glow"
              >
                {isCreating ? 'Commande en cours...' : 'Commander'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
