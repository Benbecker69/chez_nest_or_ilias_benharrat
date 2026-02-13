export interface Order {
  id: number;
  pizzas: number[];
  totalPrice: number;
  processed: boolean;
  createdAt: Date;
}
