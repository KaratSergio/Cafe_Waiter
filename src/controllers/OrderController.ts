import { Request, Response } from "express";
import { OrderService } from "../services/OrderService";
import { InMemoryOrderRepository } from "../repositories/inMemory/InMemoryOrderRepository";

const orderService = new OrderService(new InMemoryOrderRepository())

export class OrderController {
    static create(req: Request, res: Response) {
        const order = orderService.createOrder(req.body.items);
        res.status(201).json(order);
    } 

    static getAll(req: Request, res: Response) {
        res.json(orderService.getOrders())
    }
}