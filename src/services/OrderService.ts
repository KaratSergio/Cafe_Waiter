import { OrderRepository } from '../repositories/OrderRepository';
import { TableRepository } from '../repositories/TableRepository';
import { MenuItem } from '../models/MenuItem';
import { Order, OrderItem } from '../models/Orders';
import { HttpError } from '../utils/httpError';

export class OrderService {
  #orderRepo: OrderRepository;
  #tableRepo: TableRepository;

  constructor(orderRepo: OrderRepository, tableRepo: TableRepository) {
    this.#orderRepo = orderRepo;
    this.#tableRepo = tableRepo;
  }

  // VISITORS service
  async createOrder(items: { menuItem: MenuItem; quantity: number }[], tableId: number): Promise<Order> {
    if (items.length === 0 || tableId === undefined) {
      throw HttpError(400, 'Order must contain at least one item and table number');
    }

    const orderItems: OrderItem[] = items.map((item) => ({
      menuItem: item.menuItem,
      quantity: item.quantity || 1,
    }));

    const totalPrice = orderItems.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);

    const newOrder: Order = {
      id: '',
      orderNumber: '',
      tableId,
      items: orderItems,
      totalPrice,
      status: 'pending',
    };

    const createOrder = await this.#orderRepo.create(newOrder);
    await this.#tableRepo.updateTableStatus(tableId, totalPrice);
    return createOrder;
  }

  async getAllOrdersByTableId(tableId: number): Promise<Order[]> {
    return this.#orderRepo.getOrdersByTableId(tableId);
  }

  async getOneOrderByTableId(tableId: number, orderId: number): Promise<Order | null> {
    return this.#orderRepo.getOrderByTableId(tableId, orderId);
  }

  async processPayment(tableId: number): Promise<void> {
    await this.#tableRepo.archiveTableOrders(tableId);
  }

  // ADMIN service
  async getOrders(): Promise<Order[]> {
    return this.#orderRepo.getAll();
  }

  async getOrderById(orderId: number): Promise<Order | null> {
    return this.#orderRepo.getById(orderId);
  }

  async archiveOrders(date: string): Promise<void> {
    await this.#orderRepo.archiveOrders(date);
  }
}
