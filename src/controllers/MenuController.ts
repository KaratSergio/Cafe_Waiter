import { Request, Response } from "express";
import { MenuService } from "../services/MenuService";
import { InMemoryMenuRepository } from "../repositories/inMemory/InMemoryMenuRepository";

const menuService = new MenuService(new InMemoryMenuRepository())

export class MenuController {
    static async getAll(req: Request, res: Response) {
        res.json(await menuService.getMenu());
    }

    static async addItem(req: Request, res: Response) {
        try {      
            const item = await menuService.addMenuItem(req.body)
            res.status(201).json(item)
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({error: error.message})
            } else {
                res.status(500).json({error: "Internal Server Error"})
            }
        }
    }
}