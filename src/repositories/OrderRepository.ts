import { Order } from '../models/Orders';

export interface OrderRepository {
  // VISITORS repo interface
  create(order: Order): Promise<Order>;
  getOrdersByTableId(tableId: number): Promise<Order[]>;
  getOrderByTableId(tableId: number, orderId: number): Promise<Order | null>;

  // ADMIN repo interface
  getAll(): Promise<Order[]>;
  getById(id: number): Promise<Order | null>;
  archiveOrders(date: string): Promise<void>;
}
