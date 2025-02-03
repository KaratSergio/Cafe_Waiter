import { Order } from "../models/Orders";

export interface OrderRepository{
    getAll(): Promise<Order[]>;
    getById(id: string): Promise<Order | null>;
    create(order: Order): Promise<Order>;
}