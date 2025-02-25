import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';
// import { InMemoryOrderRepository } from "../repositories/inMemory/InMemoryOrderRepository";
import { PostgresOrderRepository } from '../repositories/postgreSQL/PostgresOrderRepository';
import { PostgresTableRepository } from '../repositories/postgreSQL/PostgresTableRepository';

// const orderService = new OrderService(new InMemoryOrderRepository())
const orderService = new OrderService(new PostgresOrderRepository(), new PostgresTableRepository());

export class OrderController {
  static async create(req: Request, res: Response) {
    const { items, tableId } = req.body;
    const order = await orderService.createOrder(items, tableId);
    res.status(201).json(order);
  }

  static async getAll(req: Request, res: Response) {
    res.json(await orderService.getOrders());
  }

  static async archive(req: Request, res: Response) {
    const { date } = req.body;
    await orderService.archiveOrders(date);
    return res.status(200).send(`Orders for ${date} have been moved to archive`);
  }

  static async payForTable(req: Request, res: Response) {
    const tableId = parseInt(req.params.tableId, 10);
    await orderService.processPayment(tableId);
    res.json({ message: 'Table payment archived successfully' });
  }
}
