const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface Pizza {
  id: number;
  name: string;
  price: number;
  ingredients: string[];
  available: boolean;
}

export interface Drink {
  id: number;
  name: string;
  price: number;
  size: string;
  withAlcohol: boolean;
  available: boolean;
}

export interface Dessert {
  id: number;
  name: string;
  price: number;
  available: boolean;
}

export interface Order {
  id: number;
  pizzas: number[];
  drinks: number[];
  desserts: number[];
  totalPrice: number;
  processed: boolean;
  createdAt: string;
}

export interface CreateOrderDto {
  pizzas: number[];
  drinks?: number[];
  desserts?: number[];
}

// Pizzas
export async function getPizzas(): Promise<Pizza[]> {
  const res = await fetch(`${API_URL}/pizzas`);
  if (!res.ok) throw new Error('Failed to fetch pizzas');
  return res.json();
}

// Drinks
export async function getDrinks(): Promise<Drink[]> {
  const res = await fetch(`${API_URL}/drinks`);
  if (!res.ok) throw new Error('Failed to fetch drinks');
  return res.json();
}

// Desserts
export async function getDesserts(): Promise<Dessert[]> {
  const res = await fetch(`${API_URL}/desserts`);
  if (!res.ok) throw new Error('Failed to fetch desserts');
  return res.json();
}

// Orders
export async function getOrders(): Promise<Order[]> {
  const res = await fetch(`${API_URL}/orders`);
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

export async function createOrder(data: CreateOrderDto): Promise<Order> {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create order');
  }
  return res.json();
}

export async function markOrderAsProcessed(id: number): Promise<Order> {
  const res = await fetch(`${API_URL}/orders/${id}/processed`, {
    method: 'PATCH',
  });
  if (!res.ok) throw new Error('Failed to mark order as processed');
  return res.json();
}
