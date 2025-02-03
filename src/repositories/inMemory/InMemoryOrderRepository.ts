import { Order } from "../../models/Orders";
import { OrderRepository } from "../OrderRepository";

export class InMemoryOrderRepository implements OrderRepository {
    #orders: Order[] = [];

    async getAll(): Promise<Order[]> {
        return this.#orders
    }

    async getById(id: string): Promise<Order | null> {
        return this.#orders.find(order => order.id === id) || null;
    }

    async create(order: Order): Promise<Order> {
        this.#orders.push(order)
        return order
    }  
}
