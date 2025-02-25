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

  // VISITORS controllers
  static async getOrdersByTable(req: Request, res: Response) {
    const tableId = parseInt(req.params.tableId, 10);
    const orders = await orderService.getAllOrdersByTableId(tableId);
    res.json(orders);
  }

  static async getOrderByTableAndOrderId(req: Request, res: Response) {
    const tableId = parseInt(req.params.tableId, 10);
    const orderId = parseInt(req.params.orderId, 10);
    const order = await orderService.getOneOrderByTableId(tableId, orderId);
    res.json(order);
  }

  static async payForTable(req: Request, res: Response) {
    const tableId = parseInt(req.params.tableId, 10);
    await orderService.processPayment(tableId);
    res.json({ message: 'Table payment archived successfully' });
  }

  // ADMIN controllers
  static async getAll(req: Request, res: Response) {
    res.json(await orderService.getOrders());
  }

  static async getById(req: Request, res: Response) {
    const orderId = parseInt(req.params.orderId, 10);
    const order = await orderService.getOrderById(orderId);
    res.json(order);
  }

  static async archive(req: Request, res: Response) {
    const { date } = req.body;
    await orderService.archiveOrders(date);
    return res.status(200).send(`Orders for ${date} have been moved to archive`);
  }
}
