import { Request, Response } from "express";
import { OrderService } from "../services/OrderService";
import { InMemoryOrderRepository } from "../repositories/inMemory/InMemoryOrderRepository";

const orderService = new OrderService(new InMemoryOrderRepository())

export class OrderController {
    static async create(req: Request, res: Response) {
        const order =  await orderService.createOrder(req.body.items);
        res.status(201).json(order);
    } 

    static async getAll(req: Request, res: Response) {
        const orders = await orderService.getOrders()
        res.json(orders)
    }
}