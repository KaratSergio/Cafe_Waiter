import { OrderRepository } from "../repositories/OrderRepository";
import { MenuItem } from "../models/MenuItem";
import { Order } from "../models/Orders";

export class OrderService {
    #orderRepo: OrderRepository;

    constructor(orderRepo: OrderRepository) {
        this.#orderRepo = orderRepo;
    }
    
    async getOrders(): Promise<Order[]> {
        return this.#orderRepo.getAll();
    }

    async createOrder(items: MenuItem[]): Promise<Order> {
        const totalPrice = items.reduce((sum, item) => sum + item.price, 0)
        const newOrder: Order = {
            id: Date.now().toString(),
            items,
            totalPrice,
            status: 'pending',
        }
        return this.#orderRepo.create(newOrder);
    }
}