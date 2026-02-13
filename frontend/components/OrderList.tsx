'use client';

import { Check, Clock, Package } from 'lucide-react';
import Button from './ui/Button';

interface Order {
  id: number;
  pizzas: number[];
  drinks: number[];
  desserts: number[];
  totalPrice: number;
  processed: boolean;
  createdAt: string;
}

interface OrderListProps {
  orders: Order[];
  onMarkProcessed: (id: number) => void;
}

export default function OrderList({ orders, onMarkProcessed }: OrderListProps) {
  const recentOrders = orders.slice(-5).reverse();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="bg-slate-900 p-6">
        <div className="flex items-center gap-3 text-white">
          <Package className="w-6 h-6" />
          <div>
            <h2 className="text-xl font-semibold">Commandes récentes</h2>
            <p className="text-slate-300 text-sm">
              {recentOrders.length} commande(s)
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
        {recentOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">Aucune commande</p>
          </div>
        ) : (
          recentOrders.map((order) => (
            <div
              key={order.id}
              className={`p-4 rounded-lg border transition-all ${
                order.processed
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      order.processed
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-900'
                    }`}
                  >
                    {order.processed ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">
                      Commande #{order.id}
                    </span>
                    <p className="text-xs text-slate-500">
                      {new Date(order.createdAt).toLocaleString('fr-FR', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
                <span className="text-lg font-bold text-slate-900">
                  {order.totalPrice.toFixed(2)}€
                </span>
              </div>

              <div className="flex gap-2 text-xs text-slate-600 mb-3">
                <span className="bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
                  {order.pizzas.length} pizza(s)
                </span>
                <span className="bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
                  {order.drinks.length} boisson(s)
                </span>
                <span className="bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
                  {order.desserts.length} dessert(s)
                </span>
              </div>

              {!order.processed ? (
                <Button
                  onClick={() => onMarkProcessed(order.id)}
                  variant="secondary"
                  size="sm"
                  className="w-full"
                >
                  Marquer comme traitée
                </Button>
              ) : (
                <div className="flex items-center justify-center gap-2 text-green-600 font-semibold text-sm bg-green-50 py-2 rounded-lg">
                  <Check className="w-4 h-4" />
                  <span>Commande traitée</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
