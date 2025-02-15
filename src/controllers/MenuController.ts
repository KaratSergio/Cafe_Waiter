import { Request, Response } from "express";
import { MenuService } from "../services/MenuService";
// import { InMemoryMenuRepository } from "../repositories/inMemory/InMemoryMenuRepository";
import { PostgresMenuRepository } from "../repositories/postgreSQL/PostgresMenuRepository";

// const menuService = new MenuService(new InMemoryMenuRepository())
const menuService = new MenuService(new PostgresMenuRepository())

export class MenuController {
    static async getAll(req: Request, res: Response) {
        res.json(await menuService.getMenu());
    }

    static async addItem(req: Request, res: Response) {
            const newItem = await menuService.addMenuItem(req.body);
            res.status(201).json(newItem);
    }

    static async updateItem(req: Request, res: Response) {
            const updatedItem = await menuService.updateMenuItem(req.params.id, req.body);
            res.status(200).json(updatedItem);
    }

    static async deleteItem(req: Request, res: Response) {
            await menuService.deleteMenuItem(req.params.id);
            res.status(204).send();
    }
}