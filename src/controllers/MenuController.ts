import { Request, Response } from 'express';
import { MenuService } from '../services/MenuService';
import { PostgresMenuRepository } from '../repositories/postgreSQL/PostgresMenuRepository';

const menuService = new MenuService(new PostgresMenuRepository());

export class MenuController {
  // VISITORS controllers
  static async getAll(req: Request, res: Response) {
    res.json(await menuService.getMenu());
  }

  // ADMIN controllers
  static async addItem(req: Request, res: Response) {
    const newItem = await menuService.addMenuItem(req.body);
    res.status(201).json(newItem);
  }

  static async updateItem(req: Request, res: Response) {
    const id = BigInt(req.params.id);
    const updatedItem = await menuService.updateMenuItem(id, req.body);
    res.status(200).json(updatedItem);
  }

  static async deleteItem(req: Request, res: Response) {
    const id = BigInt(req.params.id);
    await menuService.deleteMenuItem(id);
    res.status(204).send();
  }
}
