import { Router } from "express";
import { MenuController } from "../controllers/MenuController";
import { validateData, menuItemSchema } from "../utils/validators";

export const menuRoutes = Router();
menuRoutes.get('/', MenuController.getAll)
menuRoutes.post('/', validateData(menuItemSchema), MenuController.addItem)
menuRoutes.patch('/:id', validateData(menuItemSchema), MenuController.updateItem)
menuRoutes.delete('/:id', MenuController.deleteItem); 