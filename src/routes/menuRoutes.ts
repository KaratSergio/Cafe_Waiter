import { Router } from "express";
import { MenuController } from "../controllers/MenuController";
import { validateData, menuItemSchema } from "../utils/validators";
import { asyncHandler } from "../utils/asyncHandler";

export const menuRoutes = Router();
menuRoutes.get('/', asyncHandler(MenuController.getAll))
menuRoutes.post('/', validateData(menuItemSchema), asyncHandler(MenuController.addItem))
menuRoutes.patch('/:id', validateData(menuItemSchema), asyncHandler(MenuController.updateItem))
menuRoutes.delete('/:id', asyncHandler(MenuController.deleteItem)); 