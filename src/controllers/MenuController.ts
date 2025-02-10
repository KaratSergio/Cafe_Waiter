import { Request, Response } from "express";
import { MenuService } from "../services/MenuService";
import { InMemoryMenuRepository } from "../repositories/inMemory/InMemoryMenuRepository";
// import { PostgresMenuRepository } from "../repositories/postgreSQL/PostgresMenuRepository";

const menuService = new MenuService(new InMemoryMenuRepository())
// const menuService = new MenuService(new PostgresMenuRepository())

export class MenuController {
    static async getAll(req: Request, res: Response) {
        res.json(await menuService.getMenu());
    }

    static async addItem(req: Request, res: Response) {
        try {      
            const item = await menuService.addMenuItem(req.body);
            res.status(201).json(item);
        } catch (error) {
            res.status(400).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
        }
    }

    static async updateItem(req: Request, res: Response) {
        try {
            const updatedItem = await menuService.updateMenuItem(req.params.id, req.body);
            res.status(200).json(updatedItem);
        } catch (error) {
            res.status(400).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
        }
    }

    static async deleteItem(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await menuService.deleteMenuItem(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
        }
    }
}