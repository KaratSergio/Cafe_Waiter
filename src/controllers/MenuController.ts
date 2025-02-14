import { Request, Response } from "express";
import { MenuService } from "../services/MenuService";
import { asyncHandler } from "../utils/asyncHandler";
import { validateData, menuItemSchema } from "../utils/validators";
// import { InMemoryMenuRepository } from "../repositories/inMemory/InMemoryMenuRepository";
import { PostgresMenuRepository } from "../repositories/postgreSQL/PostgresMenuRepository";

// const menuService = new MenuService(new InMemoryMenuRepository())
const menuService = new MenuService(new PostgresMenuRepository())

export class MenuController {
    static getAll = asyncHandler(async(req: Request, res: Response) => {
        res.json(await menuService.getMenu());
    })

    static addItem = asyncHandler(async (req: Request, res: Response) => {
            const item = validateData(menuItemSchema, req.body);
            const newItem = await menuService.addMenuItem(item);
            res.status(201).json(newItem);
    })

    static updateItem = asyncHandler(async (req: Request, res: Response) => {
            const updates = validateData(menuItemSchema, req.body);
            const updatedItem = await menuService.updateMenuItem(req.params.id, updates);
            res.status(200).json(updatedItem);
    })

    static deleteItem = asyncHandler(async(req: Request, res: Response) => {
            await menuService.deleteMenuItem(req.params.id);
            res.status(204).send();
    })
}