import { OrderRepository } from '../repositories/OrderRepository';
import { MenuItem } from '../models/MenuItem';
import { Order, OrderItem } from '../models/Orders';
import { HttpError } from '../utils/httpError';

export class OrderService {
  #orderRepo: OrderRepository;

  constructor(orderRepo: OrderRepository) {
    this.#orderRepo = orderRepo;
  }

  async getOrders(): Promise<Order[]> {
    return this.#orderRepo.getAll();
  }

  async createOrder(items: { menuItem: MenuItem; quantity: number }[]): Promise<Order> {
    if (items.length === 0) {
      throw HttpError(400, 'Order must contain at least one item');
    }

    const orderItems: OrderItem[] = items.map((item) => ({
      menuItem: item.menuItem,
      quantity: item.quantity || 1,
    }));

    const totalPrice = orderItems.reduce(
      (sum, item) => sum + item.menuItem.price * item.quantity,
      0,
    );

    const newOrder: Order = {
      id: '',
      orderNumber: '',
      items: orderItems,
      totalPrice,
      status: 'pending',
    };

    return this.#orderRepo.create(newOrder);
  }

  async archiveOrders(): Promise<void> {
    const orderCreatedDates: Record<string, Date> = {};
    return this.#orderRepo.archiveOrders(orderCreatedDates);
  }
}
