import { Router } from "express";
import { MenuController } from "../controllers/MenuController";

export const menuRoutes = Router();
menuRoutes.get('/', MenuController.getAll)
menuRoutes.post('/', MenuController.addItem)
menuRoutes.patch('/:id', MenuController.updateItem)
menuRoutes.delete('/:id', MenuController.deleteItem); 