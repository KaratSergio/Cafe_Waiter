import { Request, Response } from "express";
import { OrderService } from "../services/OrderService";
import { asyncHandler } from "../utils/asyncHandler";
// import { InMemoryOrderRepository } from "../repositories/inMemory/InMemoryOrderRepository";
import { PostgresOrderRepository } from "../repositories/postgreSQL/PostgresOrderRepository";

// const orderService = new OrderService(new InMemoryOrderRepository())
const orderService = new OrderService(new PostgresOrderRepository())

export class OrderController {
    static create = asyncHandler(async (req: Request, res: Response) => {
            const order =  await orderService.createOrder(req.body.items);
            res.status(201).json(order);
    })

    static getAll = asyncHandler(async (req: Request, res: Response) => {
        res.json(await orderService.getOrders())
    })
}