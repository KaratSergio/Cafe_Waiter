import { Order } from '../models/Orders';

export interface OrderRepository {
  getAll(): Promise<Order[]>;
  getById(id: bigint): Promise<Order | null>;
  create(order: Order): Promise<Order>;
  archiveOrders(orderCreatedDates: Record<string, Date>): Promise<void>;
}
