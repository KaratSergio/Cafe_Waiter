import { Request, Response } from 'express';
import { MenuService } from '../services/MenuService';
import { PostgresMenuRepository } from '../repositories/postgreSQL/PostgresMenuRepository';

const menuService = new MenuService(new PostgresMenuRepository());

export class MenuController {
  // VISITORS controllers
  static async getAll(req: Request, res: Response) {
    res.json(await menuService.getMenu());
  }

  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await menuService.getMenuItemById(id);
    res.json(item);
  }

  // ADMIN controllers
  static async addItem(req: Request, res: Response) {
    const newItem = await menuService.addMenuItem(req.body);
    res.status(201).json(newItem);
  }

  static async updateItem(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updatedItem = await menuService.updateMenuItem(id, req.body);
    res.status(200).json(updatedItem);
  }

  static async deleteItem(req: Request, res: Response) {
    const id = Number(req.params.id);
    await menuService.deleteMenuItem(id);
    res.status(204).send();
  }
}
